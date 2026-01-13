#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Markdown文件permalink字段批量处理脚本
递归处理指定目录下的所有.md文件，修改其中的permalink字段
"""

import os
import re
import uuid
import argparse
from pathlib import Path
from typing import Tuple, Dict, Any
import yaml


class PermalinkProcessor:
    def __init__(self, prefix_char: str = 'p'):
        """
        初始化处理器
        
        Args:
            prefix_char (str): 一级前缀字符，默认为'p'
        """
        self.prefix_char = prefix_char.strip('/')  # 移除可能的斜杠
        self.success_count = 0
        self.error_count = 0
        self.processed_files = []
        self.error_files = []

    def extract_yaml_frontmatter(self, content: str) -> Tuple[Dict[str, Any], str]:
        """
        从markdown内容中提取YAML front matter
        
        Args:
            content (str): markdown文件内容
            
        Returns:
            Tuple[Dict[str, Any], str]: (front matter字典, 剩余内容)
        """
        # 匹配YAML front matter的正则表达式
        yaml_pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)'
        match = re.match(yaml_pattern, content, re.DOTALL)
        
        if match:
            yaml_content = match.group(1)
            remaining_content = match.group(2)
            
            try:
                # 解析YAML内容
                front_matter = yaml.safe_load(yaml_content) or {}
                return front_matter, remaining_content
            except yaml.YAMLError as e:
                print(f"YAML解析错误: {e}")
                return {}, content
        else:
            # 没有找到YAML front matter
            return {}, content

    def generate_new_permalink(self, old_permalink: str = None) -> str:
        """
        生成新的permalink
        
        Args:
            old_permalink (str): 原有的permalink
            
        Returns:
            str: 新的permalink
        """
        if old_permalink and old_permalink.strip():
            # 如果已存在permalink，提取最后一个斜杠后的内容
            old_suffix = old_permalink.split('/')[-1] if '/' in old_permalink else old_permalink
            new_permalink = f"/{self.prefix_char}/{old_suffix}"
        else:
            # 如果permalink为空，生成新的UUID
            random_uid = str(uuid.uuid4()).replace('-', '')[:8]  # 使用8位UUID
            new_permalink = f"/{self.prefix_char}/{random_uid}"
        
        return new_permalink

    def update_permalink_in_content(self, content: str) -> str:
        """
        更新内容中的permalink字段
        
        Args:
            content (str): 原始文件内容
            
        Returns:
            str: 更新后的文件内容
        """
        front_matter, remaining_content = self.extract_yaml_frontmatter(content)
        
        if not front_matter and not content.startswith('---'):
            # 文件没有YAML front matter，需要创建
            new_permalink = self.generate_new_permalink()
            new_front_matter = {'permalink': new_permalink}
            
            # 创建新的YAML front matter
            yaml_str = yaml.dump(new_front_matter, default_flow_style=False, allow_unicode=True)
            new_content = f"---\n{yaml_str}---\n{content}"
            
            return new_content
        
        # 处理现有的front matter
        old_permalink = front_matter.get('permalink', '')
        new_permalink = self.generate_new_permalink(old_permalink)
        front_matter['permalink'] = new_permalink
        
        # 重新构建文件内容
        yaml_str = yaml.dump(front_matter, default_flow_style=False, allow_unicode=True)
        new_content = f"---\n{yaml_str}---\n{remaining_content}"
        
        return new_content

    def process_md_file(self, file_path: Path) -> bool:
        """
        处理单个markdown文件
        
        Args:
            file_path (Path): 文件路径
            
        Returns:
            bool: 处理是否成功
        """
        try:
            # 读取文件内容
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # 更新permalink
            updated_content = self.update_permalink_in_content(original_content)
            
            # 写回文件
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            
            self.success_count += 1
            self.processed_files.append(str(file_path))
            print(f"✓ 成功处理: {file_path}")
            return True
            
        except Exception as e:
            self.error_count += 1
            self.error_files.append((str(file_path), str(e)))
            print(f"✗ 处理失败: {file_path} - 错误: {e}")
            return False

    def process_directory(self, directory_path: str) -> None:
        """
        递归处理目录中的所有.md文件
        
        Args:
            directory_path (str): 目录路径
        """
        directory = Path(directory_path)
        
        if not directory.exists():
            print(f"错误: 目录不存在 - {directory_path}")
            return
        
        if not directory.is_dir():
            print(f"错误: 路径不是目录 - {directory_path}")
            return
        
        print(f"开始处理目录: {directory_path}")
        print(f"前缀字符: {self.prefix_char}")
        print("-" * 50)
        
        # 递归查找所有.md文件
        md_files = list(directory.rglob("*.md"))
        
        if not md_files:
            print("未找到任何.md文件")
            return
        
        print(f"找到 {len(md_files)} 个.md文件")
        print("-" * 50)
        
        # 处理每个文件
        for md_file in md_files:
            self.process_md_file(md_file)
        
        # 输出统计结果
        self.print_summary()

    def print_summary(self) -> None:
        """打印处理结果统计"""
        print("\n" + "=" * 50)
        print("处理结果统计")
        print("=" * 50)
        print(f"成功处理文件数: {self.success_count}")
        print(f"失败处理文件数: {self.error_count}")
        print(f"总文件数: {self.success_count + self.error_count}")
        
        if self.error_files:
            print("\n失败文件详情:")
            for file_path, error in self.error_files:
                print(f"  - {file_path}: {error}")


def main():
    """主函数"""
    parser = argparse.ArgumentParser(
        description="递归处理目录中所有.md文件的permalink字段",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
使用示例:
  python script.py -d "D:\\我的开源项目\\vitepress-theme-teek-one-public\\docs\\20.文档" -p "doc"
  python script.py --directory "/path/to/docs" --prefix "blog"
  python script.py -d "./docs" (使用默认前缀 'p')
        """
    )
    
    parser.add_argument(
        '-d', '--directory',
        type=str,
        default=r"D:\code\test\teek-one\docs\10.笔记专栏",
        # help='要处理的目录路径 (默认: D:\\我的开源项目\\vitepress-theme-teek-one-public\\docs\\10.Teek)'
        help='要处理的目录路径 (默认: D:\\我的开源项目\\vitepress-theme-teek-one-public\\docs\\20.文档)'
    )
    
    parser.add_argument(
        '-p', '--prefix',
        type=str,
        default='Note',
        help='一级前缀字符 (默认: p)'
    )
    
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='仅预览要处理的文件，不实际修改'
    )
    
    args = parser.parse_args()
    
    # 验证参数
    if not args.prefix.strip():
        print("错误: 前缀字符不能为空")
        return
    
    # 如果是预览模式
    if args.dry_run:
        directory = Path(args.directory)
        if directory.exists():
            md_files = list(directory.rglob("*.md"))
            print(f"预览模式 - 找到 {len(md_files)} 个.md文件:")
            for md_file in md_files:
                print(f"  - {md_file}")
        else:
            print(f"错误: 目录不存在 - {args.directory}")
        return
    
    # 创建处理器并开始处理
    processor = PermalinkProcessor(prefix_char=args.prefix)
    processor.process_directory(args.directory)


if __name__ == "__main__":
    main()
