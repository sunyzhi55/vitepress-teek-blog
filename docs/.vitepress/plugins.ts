import { groupIconVitePlugin } from "vitepress-plugin-group-icons";
import viteImagemin from "vite-plugin-imagemin";
import { RssPlugin, RSSOptions } from "vitepress-plugin-rss";
import viteCompression from "vite-plugin-compression";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import AutoFrontmatter, {FileInfo} from "vitepress-plugin-auto-frontmatter";
import { useTransformByRules, type TransformRule } from "./theme/composables/useTransform";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import inspect from "vite-plugin-inspect";

const baseUrl = "https://teek.seasir.top";
const RSS: RSSOptions = {
  title: "Hyde Blog",
  baseUrl,
  copyright: "Copyright 2021-2025 Hyde Blog",
};

// 检查是否有 --inspect 参数
const isEnableInspectPluging = false;

export function Plugins() {
  return [
    // 自动注入一级前缀（rewrite模式）
      AutoFrontmatter({
          pattern: "**/*.md",
          // exclude 指定的对象如果在 markdown frontmatter 存在，则忽略该文件。当 include 和 exclude 存在相同文件时，exclude 优先级高
          //exclude: { coverImg: true},
          recoverTransform: true, // false 只添加不存在的字段
          // 返回一个新的 frontmatter 或只返回 undefined，如果返回 {}，则清空 MD 文件本身存在的 frontmatter
          transform: (frontMatter: Record<string, any>, fileInfo: FileInfo) => {

              // 定义需要处理的所有规则（可扩展多个）
              const rules: TransformRule[] = [
                  // { folderName: "95.Teek", prefix: "/teek" }, // 添加前缀
                  // { folderName: "10.Teek", prefix: "/teek" }, // 添加前缀
                  // { folderName: "20.工具资源/01.SSL证书", prefix: "/tool", removeLevel: 1 }, // 移除一层前缀后再添加前缀
                  // { folderName: "10.笔记专栏/99.博客搭建", prefix: "/note", clear: true }, // 清空 permalink，优先级最高
                  // { folderName: "20.文档", prefix: "/note", clear: true }, // 清空 permalink，优先级最高
                  // { folderName: "01.前端/01.vite/", prefix: "/testa/$uuid5/$uuid1/$uuid10/$uuid99", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  { folderName: "10.运维", prefix: "/linux/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  { folderName: "20.前端", prefix: "/qianduan/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  { folderName: "30.编程", prefix: "/code/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  { folderName: "35.黑客", prefix: "/hacker/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  { folderName: "40.专题", prefix: "/zhuanti/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  { folderName: "50.工具", prefix: "/tools/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  { folderName: "60.生活", prefix: "/life/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  { folderName: "70.精神小屋", prefix: "/love/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  { folderName: "80.娱乐", prefix: "/yule/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  { folderName: "85.兴趣", prefix: "/xingqu/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  { folderName: "90.关于", prefix: "/about/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  { folderName: "100.Teek", prefix: "/teek/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  // { folderName: "105.博客搭建", prefix: "/blog/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  // { folderName: "40.专题/10.博客搭建/45.静态站点构建器", prefix: "/zhuanti/$uuid5", removeLevel: 99}, // 清空前缀并且添加前缀使用随机数
                  // { folderName: "40.专题/10.博客搭建/45.静态站点构建器", prefix: "/zhuanti", clear: true }, // 清空前缀并且添加前缀使用随机数
              ];
              // 应用规则转换
              return useTransformByRules(frontMatter, fileInfo, rules);

  /*            // 如果文件本身存在了 coverImg，则不生成
              if (frontMatter.coverImg) return; // 随机获取 coverImg
              const list = [...Wallpaper, ...BlogCover];
              const coverImg = list[Math.floor(Math.random() * list.length)];
              const transformResult = { ...frontMatter, coverImg };
              console.log("transformResult", transformResult)
              return Object.keys(transformResult).length
                  ? transformResult
                  : undefined;*/
          },
      }),
    groupIconVitePlugin(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 70 },
      pngquant: { quality: [0.7, 0.8] },
      svgo: {
        plugins: [
          { name: "removeViewBox" },
          { name: "removeEmptyAttrs", active: false },
        ],
      },
    }),
    RssPlugin(RSS), //开启RSS功能
    viteCompression({
      // 配置项
      verbose: true, // 是否在控制台输出压缩结果
      disable: false, // 是否禁用压缩
      threshold: 10240, // 文件大小超过此值时进行压缩，单位为字节
      algorithm: "gzip", // 压缩算法，可选 'gzip' 或 'brotli'
      ext: ".gz", // 压缩后的文件扩展名
    }),
    chunkSplitPlugin({
      // 拆分策略：'default'（默认拆分）、'all-in-one'（合并为一个块）、'unbundle'（不打包）
      strategy: "default",
      // 自定义拆分规则，键为输出文件名，值为匹配文件的正则表达式或字符串数组
      customSplitting: {
        vendor: [/node_modules/],
        app: [/src\/main/],
      },
    }),
    // 可视化分析插件
    visualizer({
      filename: "stats.html",
      open: false, // 打包后自动打开报告
      gzipSize: true, // 压缩大小
      brotliSize: true,
    }),
    // 图片优化插件
    ViteImageOptimizer({
      // 基础图片优化配置
      png: {
        quality: 20
      },
      jpg: {
        quality: 20,
        progressive: true // 启用渐进式加载
      },
      jpeg: {
        quality: 20,
        progressive: true // 启用渐进式加载
      },
      webp: {
        quality: 20
      },
      svg: {
        multipass: true
      }
    }),
    // 检查插件（条件启用）
    isEnableInspectPluging && inspect({
      enabled: false, // 是否启用插件，可用于条件开启
      build: false, // 构建时是否启用
      outputDir: "." // 输出目录
    }),
  ];
}
