import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";

import { groupIconMdPlugin } from "vitepress-plugin-group-icons"; // 导入代码组图标插件
import timeline from "vitepress-markdown-timeline"; // 导入时间线插件
import { Nav } from "./ConfigHyde/Nav"; // 导入Nav模块
import type { HeadConfig } from "vitepress"; // 在文件顶部添加类型导入
import { HeadData } from "./ConfigHyde/Head"; // 导入 HeadData 导入和类型断言
import { SocialLinks } from "./ConfigHyde/SocialLinks"; //导入社交链接配置
import { CommentData } from "./ConfigHyde/Comment"; //导入评论配置
import { FooterGroup } from "./ConfigHyde/footerGroup"; //导入页脚信息组配置
import { Wallpaper } from "./ConfigHyde/Wallaper"; // 导入Wallaper模块
import { Plugins } from "./plugins";
import { Build } from "./build";

import { createRewrites } from "vitepress-theme-teek/config";

const description = [
  "欢迎来到 Hyde Blog 🎉",
  "Hyde Blog 是一个基于 VitePress框架Teek构建的主题，一个简洁、高效、易用的文档和博客写作工具",
  "轻松构建一个结构化知识库，适用个人博客、文档站、知识库等场景",
].toString();

const CoverImgList = Wallpaper; // 获取封面列表

const teekConfig = defineTeekConfig({
  // // 首页顶部按 F11 开启壁纸模式
  // 首页顶部按 F11 开启壁纸模式
  wallpaper: {
    enabled: true, // 是否启用壁纸模式
    hideBanner: true, // 开启壁纸模式后，全屏是否显示打字机文案，
    hideMask: true, // 开启壁纸模式后，是否隐藏 Banner 或 bodyBgImage 的遮罩层，则确保 banner.mask 和 bodyBgImage.mask 为 true 才生效
  },

  loading: false, // 启用 Loading 动画，为 false 则关闭 Loading 动画
  // loading: "正在加载中...", // 修改 Loading 文案


  themeEnhance: {
    themeColor: {
      defaultColorName: "ep-blue",   //默认主题色为蓝色
    },
  },

  windowTransition: true,

  sidebarTrigger: true,
  // 分类卡片
  category: {
    enabled: true, // 是否启用分类卡片
    limit: 8, // 一页显示的数量
    autoPage: false, // 是否自动翻页
    pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
  },
  // 标签卡片
  tag: {
    enabled: true, // 是否启用标签卡片
    limit: 21, // 一页显示的数量
    autoPage: false, // 是否自动翻页
    pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
  },


  // // 布蒜子统计分析
  // docAnalysis: {
  //   createTime: "2021-10-19",
  //   statistics: {
  //     // provider: "busuanzi",
  //     provider: "vercount",
  //     // provider: "busuanzi",
  //     // url: "//bsz.eryajf.net/jsonp?callback=Busuanzicallback"
  //   },
  //   wordCount: true,
  //   readingTime: true,
  //   // overrideInfo: [
  //   //   { key: "lastActiveTime", value: (_, currentValue) => `${currentValue}前` },
  //   //   { key: "totalPosts", label: "文章总数目" },
  //   // ],
  //   appendInfo: [{ key: "index", label: "序号", value: "One" }],
  // },


  // 布蒜子统计分析
  docAnalysis: {
    createTime: "2025-02-26",
    statistics: {
      provider: "busuanzi",
      url: "https://bszi.eryajf.net/jsonp?callback=BusuanziCallback",
      tryRequest: true,
      tryCount: 5,
      tryIterationTime: 2000,
    },
    wordCount: true,
    readingTime: true,
  },

  // //右下角回到顶部配置。
  backTop: {
    enabled: true, // 是否启动回到顶部功能
    content: "progress", // 回到顶部按钮的显示内容，可选配置 progress | icon
    done: (TkMessage) => TkMessage.success("已达到顶部🎉"), // 回到顶部后的回调
  },
  // toComment: {
  //   enabled: true, // 是否启动滚动到评论区功能
  //   done: (TkMessage) => TkMessage.success("已抵达评论区✨"), // 滚动到评论区后的回调
  // },
  // 新版代码块配置
  codeBlock: {
    enabled: true, // 是否禁用新版代码块
    collapseHeight: 700, // 超出高度后自动折叠，设置 true 则默认折叠，false 则默认不折叠
    overlay: true, // 代码块底部是否显示展开/折叠遮罩层
    overlayHeight: 400, // 当出现遮罩层时，指定代码块显示高度，当 overlay 为 true 时生效
    langTextTransform: "uppercase", // 语言文本显示样式，为 text-transform 的值:none, capitalize, lowercase, uppercase
    copiedDone: (TkMessage) => TkMessage.success("代码已复制 🎉"),
  },
  page: {
    pageSize: 16, // 每页显示的文章数量
  },
  //文章列表配置
  post: {
    excerptPosition: "top", // 文章摘要位置
    showMore: true, // 是否显示更多按钮
    moreLabel: "阅读全文 >", // 更多按钮文字
    emptyLabel: "暂无文章", // 文章列表为空时的标签
    coverImgMode: "full", // 封面图模式，default 为默认，full 为全图
    showCapture: false, // 是否在摘要位置显示文章部分文字，当为 true 且不使用 frontmatter.describe 和 <!-- more --> 时，会自动截取前 300 个字符作为摘要
    splitSeparator: false, // 文章信息（作者、创建时间、分类、标签等信息）是否添加 | 分隔符
    transition: true, // 是否开启过渡动画
    transitionName: "tk-slide-fade", // 自定义过渡动画名称
    // listStyleTitleTagPosition: "right", // 列表模式下的标题标签位置（postStyle 为 list）
    cardStyleTitleTagPosition: "left", // 卡片模式下的标题标签位置（postStyle 为 card）
    defaultCoverImg: [], // 默认封面图地址，如果不设置封面图则使用默认封面图地址
  },
  author: { name: "Hyde", link: "https://gitee.com/SeasirHyde/teek-hyde" }, // 作者信息
  //文章信息分析配置，分别作用在首页和文章页
  articleAnalyze: {
    imageViewer: { hideOnClickModal: true }, // 图片预览是否点击遮罩层关闭}
    showIcon: true, // 作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息的图标是否显示
    dateFormat: "yyyy-MM-dd hh:mm:ss", // 文章日期格式，首页和文章页解析日期时使用
    showInfo: true, // 是否展示作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息，分别作用于首页和文章页
    showAuthor: true, // 是否展示作者
    showCreateDate: true, // 是否展示创建日期
    showUpdateDate: true, // 是否展示更新日期，是否展示更新时间，仅在文章页显示
    showCategory: true, // 是否展示分类
    showTag: true, // 是否展示标签
    // 将文章信息传到一级标题下面
    teleport: {
      selector: "h1",
      position: "after",
      className: "h1-bottom-info",
    },
  },
  //面包屑配置
  breadcrumb: {
    enabled: true, // 是否启用面包屑
    showCurrentName: false, // 面包屑最后一列是否显示当前文章的文件名
    separator: "/", // 面包屑分隔符
    homeLabel: "首页", // 鼠标悬停首页图标的提示文案
  },
  // 超过半年的文章自动提示文章内容可能已过时
  articleTopTip: (frontmatter) => {
    const tip: Record<string, string> = {
      type: "warning",
      text: "文章发布较早，内容可能过时，阅读注意甄别。",
    };

    // 大于半年，添加提示
    const longTime = 6 * 30 * 24 * 60 * 60 * 1000;
    if (
      frontmatter.date &&
      Date.now() - new Date(frontmatter.date).getTime() > longTime
    )
      return tip;
  },
  // 评论配置
  comment: {
    provider: "render", // 自定义评论区必须指定 render
    options: CommentData, //需要把CommentData里面的envID解除注释就不会报错了，解除注释走teek内置的1.6.42样式评论区长表情bug
  },
  // 公告
  notice: {
    enabled: true, // 是否启用公告功能
    title: "公告", // 公告标题，支持函数式：需要和国际化搭配使用，根据不同语言环境返回不同标题
    initOpen: false, // 公告是否默认打开
    duration: 3000, // 弹框定时自动关闭，0 不自动消失
    mobileMinify: false, // 移动端自动最小化
    reopen: true, // 关闭公告弹框后，是否支持重新打开，如果为 false，则代表公告只显示一次
    useStorage: false, // 是否使用 localStorage 存储公告状态，如：当打开公告弹框后，下次进来则自动打开弹框
    twinkle: true, // 公告图标是否打开闪烁提示
    position: "center", // 公告弹框出现位置
  },

  vitePlugins: {
    permalink: true,
    sidebar: true,
    sidebarOption: {
      initItems: false, //这条命令注释后，才会让文档和目录的样式保持一致
      collapsed: true, //打开侧边栏自动收缩功能
      // ignoreList: ["nav"], //忽略的文件夹和文件
      ignoreWarn: true, // 忽略警告
      ignoreList: [/^_.*$/],
      resolveRule: "rewrites",
      checkRewritesPrefix: true,
    },

    autoFrontmatter: true, // 自动生成 frontmatter
    // permalinkOption: {
    //   notFoundDelayLoad: 1000, // 1秒后加载
    // },

    // 自动格式formatter插件 添加文章封面图
    autoFrontmatterOption: {
      permalinkType: "simple",
      exclude: { title: true, date: true }, // 排除自动生成字段
      transform: (frontmatter) => {
        // 如果文件本身存在了 coverImg，则不生成
        if (frontmatter.coverImg) return; // 随机获取 coverImg

        const list = CoverImgList;

        const coverImg = list[Math.floor(Math.random() * list.length)];

        const transformResult = { ...frontmatter, coverImg };

        return Object.keys(transformResult).length
          ? transformResult
          : undefined;
      },
    },
  },

  markdown: {
    config: (md) => {
      md.use(timeline); //时间线插件
      md.use(groupIconMdPlugin); // 代码组图标插件
    },
    demo: {
      githubUrl: "https://github.com/Kele-Bingtang/vitepress-theme-teek/blob/master/docs",
    },
  },
  // 站点分析
  siteAnalytics: [
    {
      provider: "google",
      options: {
        id: "G-YDTSLB09YH",
      },
    },
    // {
    //   provider: "baidu",
    //   options: {
    //     id: "******",
    //   },
    // },
    // {
    //   provider: "umami",
    //   options: {
    //     id: "******",
    //     src: "**",
    //   },
    // },
  ],
  // 赞赏在文章下方
  appreciation: {
    position: "doc-after",
    options: {
      // buttonHtml: `<button>测试按钮</button>`,
      icon: "weChatPay", // 赞赏图标，内置 weChatPay 和 alipay
      expandTitle: "打赏支持", // 展开标题，支持 HTML
      collapseTitle: "下次一定", // 折叠标题，支持 HTML
      content: `<img src='/appreciation/WeChatPay.jpg'><img src='/appreciation/Alipay.jpg'>`, // 赞赏内容，支持 HTML
      expand: false, // 是否默认展开，默认 false
    },
  },
  // 赞赏在 文章导航栏下侧
  // appreciation: {
  //   position: "aside-bottom",
  //   options: {
  //     title: `<span style="color: var(--tk-theme-color)">欢迎打赏支持</span>`, // 赞赏标题，支持 HTML
  //     content: `<img src='/appreciation/WeChatPay.jpg'><img src='/appreciation/Alipay.jpg'>`, // 赞赏内容，支持 HTML
  //   },
  // },
  // 文章分享
  articleShare: {
    enabled: true, // 是否开启文章链接分享功能
    text: "分享此页面", // 分享按钮文本
    copiedText: "链接已复制", // 复制成功文本
    query: true, // 是否包含查询参数
    hash: true, // 是否包含哈希值
  },
  footerGroup: FooterGroup, // 页脚信息组配置
  // 精选文章卡片
  topArticle: {
    enabled: true, // 是否启用精选文章卡片
    limit: 5, // 一页显示的数量
    autoPage: false, // 是否自动翻页
    pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
    dateFormat: "yyyy-MM-dd hh:mm:ss", // 精选文章的日期格式
  },
  themeSize: "large",
  // 风险链接提示页
  riskLink: {
    enabled: true, //是否启用风险链接提示功能
    whitelist: ["https://teek.seasir.top/", /https:\/\/github.com/], // 白名单，匹配到的链接不提示风险
    blacklist: [], // 黑名单，匹配到的链接提示风险
  },
  // 私密文章（登录页）
  private: {
    enabled: true, // 是否启用私密文章功能
    expire: "1d", //可选，登录失效时间，如果不填则以全局配置为准，全局设置默认为 1d
    session: true, //可选，开启是否在网页关闭或刷新后，清除登录状态，这样再次访问网页，需要重新登录，默认为 false
    siteLogin: false, //可选，是否使用站点级别登录功能，即第一次进入网站需要验证，默认为 false
    site: [
      {
        username: "teek", //用户名
        password: "teek", //密码
        role: "common", // 角色，common为普通用户，admin为管理员
        expire: "1d", // 过期时间，单位：天
        session: true, // 可选，开启是否在网页关闭或刷新后，清除登录状态，这样再次访问网页，需要重新登录，默认为 false
        strategy: "always", //可选，登录策略，once 代表一次登录，always 代表每次访问都登录，默认为 once
      },
      {
        username: "teek-site-2",
        password: "teek",
        role: "admin",
        expire: "1d",
        session: false,
        strategy: "always",
      },
    ],
    pages: [
      {
        username: "teek",
        password: "teek",
        expire: "1d",
        session: true,
        strategy: "once",
      },
      {
        username: "teek-pages-2",
        password: "teek",
        expire: "1d",
        session: false,
        strategy: "always",
      },
    ],
    // realm: {
    //   blog: [
    //     {
    //       username: "teek-blog-1",
    //       password: "teek",
    //       expire: "1d",
    //       session: true,
    //       strategy: "once",
    //     },
    //     {
    //       username: "teek-blog-2",
    //       password: "teek",
    //       expire: "1d",
    //       session: false,
    //       strategy: "always",
    //     },
    //   ],
    //   comment: [
    //     {
    //       username: "teek-comment-1",
    //       password: "teek",
    //       expire: "1d",
    //       session: true,
    //       strategy: "always",
    //     },
    //     {
    //       username: "teek-comment-2",
    //       password: "teek",
    //       expire: "1d",
    //       session: false,
    //       strategy: "always",
    //     },
    //   ],
    // },
    // onFocus: (value, formName) => {},
    // onBlur: (value, formName) => {},
    // doLogin: (loginInfo, type, nativeExecLogin) => true,
    // doValidate: (type, frontmatter, nativeExecLogin) => true,
    // encrypt: (value, frontmatter) => value,
    // decrypt: (value, frontmatter) => value,
  },
  // 在每个文章页顶部显示 VitePress 容器添加提示，使用场景如添加文章版权声明。
  // articleBottomTip: frontmatter => {
  //   if (typeof window === "undefined") return;

  //   const hash = false;
  //   const query = false;
  //   const { origin, pathname, search } = window.location;
  //   const url = `${origin}${frontmatter.permalink ?? pathname}${query ? search : ""}${hash ? location.hash : ""}`;
  //   const author = "Hyde";

  //   return {
  //     type: "tip",
  //     // title: "声明", // 可选
  //     text: `<p>文章作者：<a href="https://teek.seasir.top/" target="_blank"> ${author} </a></p>
  //            <p>文章链接：<a href="${url}" target="_blank">${url}</a></p>
  //            <p>版权声明：本博客所有文章除特别声明外，均采用
  //            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en" target="_blank">BY-NC-SA 4.0</a>许可协议。
  //            转载请注明来自<a href="https://teek.seasir.top/" target="_blank"> ${author} </a>
  //            </p>
  //           `,
  //   };
  // },

  // 单文章页banner功能
  articleBanner: {
    enabled: true, // 是否启用单文章页 Banner
    showCategory: true, // 是否展示分类
    showTag: true, // 是否展示标签
    defaultCoverImg: "", // 默认封面图
    defaultCoverBgColor: "", // 默认封面背景色，优先级低于 defaultCoverImg
  },
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  rewrites: createRewrites({
    srcDir: "docs",
  }),
  base: "/",
  extends: teekConfig,
  title: "Hyde Blog", //左上角网站名称
  description: description,

  cleanUrls: true, //设置为true就是让链接后不默认添加.html

  lastUpdated: true, // 显示上次更新时间
  lang: "zh-CN",
  head: HeadData as HeadConfig[],
  markdown: {
    lineNumbers: true, // 开启行号
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  sitemap: {
    hostname: "https://onedayxyy.cn",
    // transformItems: items => {
    //   const permalinkItemBak: typeof items = [];
    //   // 使用永久链接生成 sitemap
    //   const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig.permalinks;
    //   items.forEach(item => {
    //     const permalink = permalinks?.map[item.url];
    //     if (permalink) permalinkItemBak.push({ url: permalink, lastmod: item.lastmod });
    //   });
    //   return [...items, ...permalinkItemBak];
    // },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/avatar/avatar.webp",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: Nav, // 导航栏配置
    socialLinks: SocialLinks, // 社交链接配置
    search: {
      provider: "algolia",
      options: {
        appId: "2JNHX3I8RB",
        apiKey: "84a579c812901faa463103fb5ab52c4c",
        indexName: "hyde_blog",
        locales: {
          root: {
            placeholder: "搜索文档",
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                searchBox: {
                  resetButtonTitle: "清除查询条件",
                  resetButtonAriaLabel: "清除查询条件",
                  cancelButtonText: "取消",
                  cancelButtonAriaLabel: "取消",
                },
                startScreen: {
                  recentSearchesTitle: "搜索历史",
                  noRecentSearchesText: "没有搜索历史",
                  saveRecentSearchButtonTitle: "保存至搜索历史",
                  removeRecentSearchButtonTitle: "从搜索历史中移除",
                  favoriteSearchesTitle: "收藏",
                  removeFavoriteSearchButtonTitle: "从收藏中移除",
                },
                errorScreen: {
                  titleText: "无法获取结果",
                  helpText: "你可能需要检查你的网络连接",
                },
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                  searchByText: "搜索提供者",
                },
                noResultsScreen: {
                  noResultsText: "无法找到相关结果",
                  suggestedQueryText: "你可以尝试查询",
                  reportMissingResultsText: "你认为该查询应该有结果？",
                  reportMissingResultsLinkText: "点击反馈",
                },
              },
            },
          },
        },
      },
    },

    editLink: {
      text: "在 GitHub 上编辑此页",
      pattern: "https://gitee.com/SeasirHyde/teek-hyde/edit/main/docs/:path",
    },
  },

  vite: {
    server: {
      host: "0.0.0.0", // 推荐使用，自动适配电脑IP
      port: 5174, // 端口号
      strictPort: false, // 若端口已被占用则会直接退出
      // open: true, // 运行后自动打开网页
    },
    // 构建
    build: Build() as any,
    // 插件
    plugins: Plugins(), // vite 插件
  },
  //解决404 title方法
  transformHtml: (code, id, context) => {
    if (context.page !== "404.md") return code;
    return code.replace("404 | ", "");
  },
});
