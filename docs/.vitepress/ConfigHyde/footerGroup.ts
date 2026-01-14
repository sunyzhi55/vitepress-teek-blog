// 页脚信息组配置
// 站点部署在子路径（GitHub Pages）时需要补齐 base
import { base } from "../siteBase";

const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
const withBase = (link: string) =>
  /^https?:\/\//.test(link) ? link : `${normalizedBase}${link.startsWith("/") ? "" : "/"}${link}`;

export const FooterGroup = [
  {
    title: "博客",
    links: [
      { name: "全部分类", link: withBase("/categories") },
      { name: "全部标签", link: withBase("/tags") },
      { name: "文章归档", link: withBase("/archives") },
      { name: "全部清单", link: withBase("/articleOverview") },
    ],
  },
  {
    title: "专栏",
    links: [
      { name: "AcWingBase", link: withBase("/algorithms/acwing-base/") },
      { name: "左神学习笔记", link: withBase("/algorithms/zuoshen/") },
      { name: "杂笔记", link: withBase("/algorithms/misc/") },
      { name: "CS 学习之路", link: withBase("/cs-learning/") },
    ],
  },
  {
    title: "页面",
    links: [
      { name: "畅所欲言", link: withBase("/message-area/") },
      { name: "订阅更新", link: withBase("/subscribe") },
      { name: "站点导航", link: withBase("/nav") },
      { name: "风险提示", link: withBase("/risk-link") },
    ],
  },
  {
    title: "服务",
    links: [
      {
        name: "51.la统计",
        link: "https://v6.51.la/report/overview?comId=3062309",
      },
      {
        name: "谷歌分析",
        link: "https://analytics.google.com/analytics/web/#/p478527709/reports/intelligenthome",
      },
      {
        name: "站点统计",
        link: "https://umami.seasir.top/share/9Pa3wB79cHKsoAyT/teek.seasir.top",
      },
      { name: "站点状态", link: "https://status.seasir.top/status/monitor" },
    ],
  },
];
