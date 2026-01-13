import type { DefaultTheme } from "vitepress/theme";

export const Nav: DefaultTheme.NavItem[] = [
  {
    text: "🏠 首页",
    link: "/",
  },
  {
    text: "📘 算法笔记",
    items: [
      {
        text: "🗺️ 笔记总览",
        link: "/algorithms/",
      },
      {
        text: "🧩 AcWing 基础课",
        link: "/algorithms/acwing-base/",
      },
      {
        text: "🧠 左神学习笔记",
        link: "/algorithms/zuoshen/",
      },
      {
        text: "📝 杂笔记",
        link: "/algorithms/misc/",
      },
    ],
  },
  {
    text: "🗺️ CS 学习之路",
    items: [
      {
        text: "🧭 专栏总览",
        link: "/cs-learning/",
      },
      {
        text: "🏫 大学课程笔记",
        link: "/cs-learning/university-course-notes/",
        // items: [
        //   { text: "📚 数据结构", link: "/cs-learning/university-course-notes/data-structure-notes" },
        //   { text: "⚙️ 计算机组成原理", link: "/cs-learning/university-course-notes/principle-of-computer-composition-notes" },
        //   { text: "🌐 计算机网络", link: "/cs-learning/university-course-notes/computer-network-notes" },
        //   { text: "🖥️ 操作系统", link: "/cs-learning/university-course-notes/operating-system-notes" },
        //   { text: "🧠 马克思主义原理（问题）", link: "/cs-learning/university-course-notes/marxist-principles-questions" },
        // ],
      },
      {
        text: "📊Python 笔记",
        items: [
          {
            text: "📚 Python 总览",
            link: "/cs-learning/python-notes/",
          },
          {
            text: "🐍 Python笔记 - 语言与工具",
            link: "/cs-learning/python-notes/language-and-tools/",
          },
          {
            text: "🤖 Python笔记 - 机器学习&深度学习",
            link: "/cs-learning/python-notes/machine-learning-deep-learning/",
          },
        ],
      },
      {
        text: "Java - 稳如磐石的工程之选",
        link: "/cs-learning/java-notes/",
      },
    ],
  },
  {
    text: "🗂️ 索引",
    items: [
      {
        text: "📋 文章清单",
        link: "/articleOverview",
      },
      {
        text: "🗃️ 归档",
        link: "/archives",
      },
      {
        text: "🏷️ 标签",
        link: "/tags",
      },
      {
        text: "🧭 分类",
        link: "/categories",
      },
    ],
  },
  {
    text: "🧭 导航",
    items: [
      {
        text: "🗺️ 网站导航",
        link: "/nav",
      },
      {
        text: "💬 留言板",
        link: "/message-area/",
      },
    ],
  },
  {
    text: "📡 订阅",
    items: [
      {
        text: "📰 RSS / Feed",
        link: "/feed.rss",
      },
      {
        text: "📘 订阅说明",
        link: "/subscribe",
      },
    ],
  },
];
