---
date: 2026-01-09 19:16:18
title: 订阅（RSS / Feed）
permalink: /subscribe
layout: doc
sidebar: false
article: false
outline:
  - 2
  - 3
editLink: false
---

# 📡 订阅（RSS / Feed）

本站已集成 RSS/Feed 订阅能力：构建时会生成 `feed.rss`，部署后可直接被各类阅读器订阅。

## ✅ 订阅地址

- RSS/Feed：`/feed.rss`

如果你的站点域名是 `https://example.com`，那么完整订阅地址是：

- `https://example.com/feed.rss`

## 🧭 在哪里能找到

- 顶部导航：`📡 订阅` → `📰 RSS / Feed`
- 社交图标：右上角社交区也提供 `RSS` 入口

## 🛠️ 如何“实现/开启”订阅功能（你现在这个项目的做法）

1. 插件已启用：项目使用 `vitepress-plugin-rss`（见 docs/.vitepress/plugins.ts），构建时生成 `feed.rss`。
2. 你需要设置正确的站点地址：
   - 当前配置的 `baseUrl` 决定了 RSS 内部文章链接的域名部分。
   - 如果你部署到了自己的域名，请把 `docs/.vitepress/plugins.ts` 里的 `baseUrl` 改成你的真实域名（例如 `https://example.com`）。

## 🔎 阅读器怎么订阅

- 复制 `https://你的域名/feed.rss` 到任意 RSS 阅读器添加订阅即可。
- 常见阅读器：
  - iOS/macOS：Reeder、NetNewsWire
  - Windows：Fluent Reader
  - Android：Read You
  - Web：Inoreader、Feedly
