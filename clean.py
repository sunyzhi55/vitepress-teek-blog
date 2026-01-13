#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Markdown文件permalink字段批量清除脚本
"""

import os
import re
from pathlib import Path
from typing import Dict, Any
import yaml
import argparse

class PermalinkCleaner:
    def __init__(self):
        self.success_count = 0
        self.error_count = 0

    def remove_permalink(self, content: str) -> str:
        """移除内容中的permalink字段"""
        front_matter, remaining = self._extract_frontmatter(content)
        if not front_matter:
            return content
            
        if 'permalink' in front_matter:
            del front_matter['permalink']
            
        if not front_matter:  # 如果front matter为空则完全移除
            return remaining
            
        return f"---\n{yaml.dump(front_matter, allow_unicode=True)}---\n{remaining}"

    def _extract_frontmatter(self, content: str) -> Tuple[Dict[str, Any], str]:
        """提取YAML frontmatter"""
        match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)', content, re.DOTALL)
        if not match:
            return {}, content
            
        try:
            return yaml.safe_load(match.group(1)) or {}, match.group(2)
        except yaml.YAMLError:
            return {}, content

    def process_file(self, file_path: Path):
        """处理单个文件"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            new_content = self.remove_permalink(content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                self.success_count += 1
                print(f"✓ 已清理: {file_path}")
            else:
                print(f"○ 无变化: {file_path}")
                
        except Exception as e:
            self.error_count += 1
            print(f"✗ 失败: {file_path} - {str(e)}")

    def process_directory(self, directory: str):
        """处理目录"""
        path = Path(directory)
        if not path.exists():
            print(f"错误: 路径不存在 - {directory}")
            return
            
        print(f"开始清理目录: {directory}")
        for md_file in path.rglob("*.md"):
            self.process_file(md_file)
            
        print(f"\n处理完成: 成功 {self.success_count} 个, 失败 {self.error_count} 个")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="批量清除Markdown文件的permalink字段")
    parser.add_argument('D:\我的开源项目\vitepress-theme-teek-one-public\docs\10.Teek', help="要处理的目录路径")
    args = parser.parse_args()
    
    cleaner = PermalinkCleaner()
    cleaner.process_directory(args.directory)
