// 卡片栏社交信息
import { gitee, github, rss } from "../theme/icon/icons";
import type { Social } from "vitepress-theme-teek/config";

export const SocialDate: Social[] = [
  {
    name: "GitHub",
    icon: github,
    iconType: "component",
    link: "https://github.com/sunyzhi55",
  },
  {
    name: "Gitee",
    icon: gitee,
    iconType: "component", // 指定为组件类型
    link: "https://gitee.com/sunyzhi55",
  },
  {
    name: "RSS",
    icon: rss,
    iconType: "component",
    link: "/feed.rss",
  },
];
