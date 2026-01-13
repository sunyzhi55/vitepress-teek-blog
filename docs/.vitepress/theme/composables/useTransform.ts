import { FileInfo } from "vitepress-plugin-auto-frontmatter";

// 定义规则类型
export interface TransformRule {
  folderName: string;        // 匹配文件或文件夹名称
  prefix: string;            // 要添加的前缀
  removeLevel?: number;      // 可选：要移除的前缀层级（以 / 分割），可以填写一个很大的数，那么就会全部清空然后添加前缀，适合移除前缀并添加的场景
  clear?: boolean;           // 可选，是否清空 permalink，适合只想要清空使用。true=清空（即使填了prefix也会清空，clear优先级高），默认false
}

/**
 * 获取路径按 / 分割后的第一个有效分组（忽略空字符串）
 * @param path
 */
const getFirstPathSegment = (path: string): string => {
  // 按 / 分割并过滤空字符串（处理开头/结尾的斜杠或连续斜杠）
  const segments = path.split('/').filter(segment => segment.trim() !== '');
  return segments.length > 0 ? segments[0] : '';
};

/**
 * 生成指定长度的随机字符串（数字 + 小写字母）
 * @param length 字符串长度（最大为10）
 * @returns 指定长度的随机字符串
 */
const generateRandomString = (length: number): string => {
  if (length <= 0) return '';
  const maxLen = 10;
  const actualLength = Math.min(length, maxLen); // 最大10位

  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  const charsLength = chars.length;
  let result = '';

  for (let i = 0; i < actualLength; i++) {
    result += chars[Math.floor(Math.random() * charsLength)];
  }

  return result;
};

/**
 * 替换字符串中的 $UUID{n} 占位符
 * 支持 $UUID2, $UUID5, $UUID10 等格式
 * - n 超过 10 按 10 处理
 * - 不区分大小写（可选）
 * @param str 原始字符串
 * @returns 替换后的字符串
 * @example
 * replaceUuidPlaceholder('/test/$UUID10') → '/test/a3k9m2x8p1'
 * replaceUuidPlaceholder('/user/$UUID5/$UUID2') → '/user/abc12/de'
 */
const replaceUuidPlaceholder = (str: string): string => {
  return str.replace(/\$UUID(\d+)/gi, (match, numStr) => {
    const length = parseInt(numStr, 10);
    return generateRandomString(length);
  });
};

export const useTransformByRules = (frontMatter: Record<string, any>, fileInfo: FileInfo, rules: TransformRule[]) => {

  // 转换函数：支持移除指定层级前缀后再添加新前缀，新增clear清空逻辑 + UUID占位符替换
  for (const rule of rules) {
    const { folderName, prefix, removeLevel, clear = false } = rule; // 解构时给clear默认值false

    // 1. 检查文件路径是否匹配文件夹规则（精确匹配单个文件时，需完全一致）
    if (!fileInfo.relativePath.startsWith(folderName)) {
      continue;
    }

    // 处理日期：减去8小时抵消时区转换（原有逻辑不变）
    if (frontMatter.date) {
      const originalDate = new Date(frontMatter.date);
      originalDate.setHours(originalDate.getHours() - 8);
      frontMatter.date = originalDate;
    }

    // 2. 如果clear为true，直接清空permalink并返回（优先级最高）
    if (clear) {
      const newFrontMatter = { ...frontMatter, permalink: '' };
      console.log(`匹配规则：${folderName}（clear=true）→ 清空permalink`);
      return newFrontMatter;
    }

/*    // 3. 非clear模式：检查permalink是否存在（原有逻辑不变）
    if (!frontMatter.permalink) {
      continue;
    }*/

    // 4. 新增！替换prefix中的$UUID/$UUID10占位符
    let normalizedPrefix = replaceUuidPlaceholder(prefix);
    // 原有：标准化前缀（确保以 / 开头）
    normalizedPrefix = normalizedPrefix.startsWith('/') ? normalizedPrefix : `/${normalizedPrefix}`;
    if (prefix === ""){
      normalizedPrefix = ""
    }

    let originalPermalink = frontMatter.permalink;
    if (originalPermalink === null || originalPermalink === undefined) {
      originalPermalink = "";
    }

    // 5. 核心调整：按 / 分组，比较第一个前缀是否一致（原有逻辑不变）
    // 获取目标前缀的第一个分组（如 "/test/12345" → "test"）
    const targetFirstSegment = getFirstPathSegment(normalizedPrefix);
    // 获取当前 permalink 的第一个分组（如 "/old/path" → "old"）
    const currentFirstSegment = getFirstPathSegment(originalPermalink);

    // 若第一个分组相同，说明已包含目标前缀，无需处理（原有逻辑不变）
    if (currentFirstSegment === targetFirstSegment) {
      continue;
    }

    // 7. 处理 permalink：先移除指定层级，再添加新前缀（原有逻辑不变）
    if (removeLevel !== undefined && removeLevel > 0) {
      // 分割permalink（处理空字符串和开头的 /）
      const parts = originalPermalink.split('/').filter(part => part);
      // 确保移除的层级不超过实际存在的层级（removeLevel=99时，会移除所有层级，只剩根路径）
      const actualRemoveLevel = Math.min(removeLevel, parts.length);
      // 移除前N个层级，再重新拼接
      const remainingParts = parts.slice(actualRemoveLevel);
      originalPermalink = remainingParts.length > 0
        ? `/${remainingParts.join('/')}`
        : ''; // 移除所有层级后，originalPermalink为 ""
    }

    // 8. 拼接新 permalink 并返回结果（原有逻辑不变，此时prefix已替换占位符）
    const newPermalink = `${normalizedPrefix}${originalPermalink}`;
    const newFrontMatter = { ...frontMatter, permalink: newPermalink };

    console.log(`原permalink：${frontMatter.permalink} → 新permalink：${newPermalink}`);
    return newFrontMatter;
  }
  // 没有匹配的规则，返回undefined（不修改数据）
  return undefined;
}
