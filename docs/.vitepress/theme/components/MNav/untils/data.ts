import type { NavData } from "./types.ts";
import { SiteAnalytics } from "./Data/SiteAnalytics"; // 网站分析
import { Status } from "./Data/Status"; // 网站监控
import { ImgTool } from "./Data/ImgTool"; //图像工具
import { PictureTools } from "./Data/PictureTools"; // 图床工具
import { Photo } from "./Data/Photo"; // 开源相册
import { NavWebsite } from "./Data/NavWebsite"; // 导航网站
import { Wallpaper } from "./Data/Wallpaper"; // 精美壁纸
import { Email } from "./Data/Email"; // 邮箱相关
import { Utilities } from "./Data/Utilities"; // 常用工具
import { AICode } from "./Data/AICode"; // AI编程
import { React } from "./Data/React"; // React 生态
import { Vue } from "./Data/Vue"; // Vue 生态
import { javaScript } from "./Data/JavaScript.ts"; // JavaScript 框架
import { CSS } from "./Data/CSS"; // CSS 框架
import { Applet } from "./Data/Applet"; // 小程序
import { Node } from "./Data/Node"; // Node 相关
import { Visibility } from "./Data/Visibility"; // 可视化库
import { BuildPackage } from "./Data/BuildPackage"; // 构建打包
import { deploy } from "./Data/Deploy"; // 部署平台
import { SiteBuilder } from "./Data/SiteBuilder"; // 站点生成器
import { IconLibrary } from "./Data/IconLibrary"; // 图标库
import { DevCommunity } from "./Data/DevCommunity"; // 开发者社区
import { Axios } from "./Data/Axios"; // Axios
import { Music } from "./Data/Music"; // 音乐网站
import { Markdown } from "./Data/Markdown"; // Markdown编辑器
import { Proxy } from "./Data/Proxy"; // 代理软件
import { CDN } from "./Data/CDN"; // CDN加速
import { Mysql } from "./Data/Mysql"; // 数据库
import { DocumentNotes } from "./Data/DocumentNotes"; // 文档笔记
import { OperationTools } from "./Data/OperationTools"; // 运维工具
import { SSL } from "./Data/SSL"; // SSL证书
import {Privatestorage} from "./Data/PrivateStorage" // 私有储存
import { Other } from "./Data/Other"; // 其他

export const NAV_DATA: NavData[] = [
  {
    title: "网站分析",
    items: SiteAnalytics.items,
  },
  {
    title: "网站监控",
    items: Status.items,
  },
  {
    title: "图像工具",
    items: ImgTool.items,
  },
  {
    title: "开源相册",
    items: Photo.items,
  },
  {
    title: "图床工具",
    items: PictureTools.items,
  },
  {
    title: "导航网站",
    items: NavWebsite.items,
  },
  {
    title: "精美壁纸",
    items: Wallpaper.items,
  },
  {
    title: "邮件相关",
    items: Email.items,
  },
  {
    title: "常用工具",
    items: Utilities.items,
  },
  {
    title: "编程开发",
    items: AICode.items,
  },
  {
    title: "React 生态",
    items: React.items,
  },
  {
    title: "Vue 生态",
    items: Vue.items,
  },
  {
    title: "JS 框架",
    items: javaScript.items,
  },
  {
    title: "CSS 框架",
    items: CSS.items,
  },
  {
    title: "小程序",
    items: Applet.items,
  },
  {
    title: "Node 相关",
    items: Node.items,
  },
  {
    title: "可视化库",
    items: Visibility.items,
  },
  {
    title: "构建打包",
    items: BuildPackage.items,
  },
  {
    title: "部署平台",
    items: deploy.items,
  },
  {
    title: "站点生成器",
    items: SiteBuilder.items,
  },
  {
    title: "图标库",
    items: IconLibrary.items,
  },
  {
    title: "开发者社区",
    items: DevCommunity.items,
  },
  {
    title: "Axios",
    items: Axios.items,
  },
  {
    title: "音乐网站",
    items: Music.items,
  },
  {
    title: "Markdown编辑器",
    items: Markdown.items,
  },
  {
    title: "代理软件",
    items: Proxy.items,
  },
  {
    title: "CDN加速",
    items: CDN.items,
  },
  {
    title: "数据库",
    items: Mysql.items,
  },
  {
    title: "文档笔记",
    items: DocumentNotes.items,
  },
  {
    title: "运维工具",
    items: OperationTools.items,
  },
  {
    title: "SSL证书",
    items: SSL.items,
  },
  {
    title: "私有储存",
    items: Privatestorage.items,
  },
  {
    title: "其他",
    items: Other.items,
  },
];
