# 🔥Flumina Blog（VitePress）

这是一个基于 **VitePress** + **vitepress-theme-teek** 的纯静态博客/知识库项目。

参考链接：

- [VitePress 官方文档](https://vitepress.dev/)
- [vitepress-theme-teek 主题仓库](https://github.com/Kele-Bingtang/vitepress-theme-teek)
- [teek-hyde 主题仓库（Gitee）](https://gitee.com/SeasirHyde/teek-hyde)

## 记录修改地方

- 使用 `vitepress-theme-teek` 主题，并做了一些本地定制化修改（如侧边栏、首页布局等）。

1、删除微信卡片，删除组件 `WeChatCard.vue` 及相关引用。

2、删除 `docs\.vitepress\theme\components\About` 目录下的所有文件及引用。

3、删除 `docs\.vitepress\theme\components\homepage` 目录及其目录下的所有文件及引用。

格式化重要代码文件：
`pnpm format`

## 快速开始

### 环境要求

- Node.js（建议 18+，越新越好）
- pnpm（本项目使用 pnpm 管理依赖）

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm docs:dev
```

启动后根据终端输出打开本地地址即可预览。

### 构建产物

```bash
pnpm docs:build
```

构建输出会生成到 `docs/.vitepress/dist/`（该目录已在 `.gitignore` 中忽略，不建议提交）。

### 本地预览构建结果

```bash
pnpm docs:preview
```

## 目录结构（精简后）

```text
.
├─ docs/                      # 站点内容（Markdown）与 VitePress 配置
│  ├─ .vitepress/              # VitePress 配置与本地主题增强
│  ├─ @pages/                  # 独立页面（归档/标签/分类/订阅等）
│  ├─ nav/                     # 导航页（含导航组件渲染）
│  ├─ public/                  # 静态资源（图片/字体/图标等，最终会原样拷贝到站点根目录）
│  └─ ...                      # 你的文章/笔记内容
├─ scripts/
│  └─ python/                  # 一些维护脚本（可选）
├─ package.json                # 脚本与依赖
└─ pnpm-lock.yaml              # 锁文件（建议提交）
```

## 写作与资源建议

- 新文章：直接在 `docs/` 下新建 `.md` 文件即可。
- 图片/资源：建议放到 `docs/public/` 下，再用 `/xxx/yyy.png` 这种绝对路径引用。
  - 例如：`docs/public/images/a.png` → Markdown 中写 `![](/images/a.png)`

## 部署（GitHub Pages）

这是纯静态站点，推荐用 GitHub Pages 或任意静态托管平台部署。

常见做法：

1. 本地执行 `pnpm docs:build`
2. 将生成的 `docs/.vitepress/dist/` 发布到 Pages（或用 GitHub Actions 自动构建发布）

如果你需要我帮你补一个 GitHub Actions（自动构建并部署到 Pages），告诉我你的仓库名和 Pages 目标分支（通常是 `gh-pages`）。

## 可选脚本

### 批量处理 Markdown 的 permalink

脚本位置：`scripts/python/md_permalink_processor.py`

示例：

### 扫描未引用的 public 静态资源

脚本位置：`scripts/node/find-unused-public-assets.mjs`

用途：扫描 `docs/public/` 下的图片/字体/图标等资源，找出在源码中没有被引用的文件，帮助你做第二轮精简。

```bash
node scripts/node/find-unused-public-assets.mjs
```

确认列表无误后，可加 `--delete` 自动删除：

```bash
node scripts/node/find-unused-public-assets.mjs --delete
```

```bash
# 预览会处理哪些文件（不写入）
python scripts/python/md_permalink_processor.py --dry-run

# 将 docs/ 下所有 md 的 permalink 更新为 /note/xxx
python scripts/python/md_permalink_processor.py -d "./docs" -p "note"
```

## 常用命令

- 开发：`pnpm docs:dev`
- 构建：`pnpm docs:build`
- 预览：`pnpm docs:preview`
