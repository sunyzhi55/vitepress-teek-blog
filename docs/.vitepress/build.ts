import { visualizer } from "rollup-plugin-visualizer";
import type { BuildOptions } from "vite";

export function Build(): BuildOptions {
  return {
    // 生成 sourcemap 方便定位压缩后的代码
    // sourcemap: true,
    chunkSizeWarningLimit: 4096, // 限制警告的块大小
    assetsInlineLimit: 4096, // 小于 4KB 的字体转为 base64
    minify: "terser", // 使用 Terser 进行代码压缩
    terserOptions: {
      compress: {
        drop_console: false, // 关闭"一刀切"删除所有 console
        drop_debugger: true, // 保留移除 debugger 的配置
        // 明确指定要移除的 console 方法（排除 info）
        pure_funcs: ["console.log", "console.warn", "console.error", "console.debug", "console.trace"],
        dead_code: true, // 移除不可达代码（消除死代码）
        arrows: true, // 将 function 转换为箭头函数（优化代码体积）
        unused: true, // 移除未使用的变量/函数（需确保不影响程序逻辑）
        join_vars: true, // 合并连续 var 声明（优化作用域）
        collapse_vars: true, // 内联单次使用的变量（体积优化）
      },
      format: {
        comments: false, // 移除所有注释（保留版权声明需使用正则表达式）
        preamble: "/* 项目版本 1.0.0 */", // 文件头部添加版权声明（需遵守 MIT 协议）
      },
      mangle: {
        toplevel: true, // 混淆顶级作用域变量名（保留 class/function 名称）
        properties: false, // 保留对象属性名（防止破坏 DOM 属性绑定）
      },
    },
    rollupOptions: {
      plugins: [
        visualizer({
          open: false,
          gzipSize: true,
          brotliSize: true,
        }) as any,
      ],
      output: {
        manualChunks: (id: string) => {
          // 排除可能导致问题的主题库和核心依赖
          const excludePkgs = [
            "vitepress-theme-teek", // 主题库，避免拆分
            "vue",
            "vue-router", // Vue 核心库，建议整体打包
            "vitepress", // VitePress 核心，避免拆分
          ];

          if (id.includes("node_modules")) {
            const pkg = id.split("node_modules/")[1].split("/")[0];
            // 如果是需要排除的库，不单独分块（使用默认策略）
            if (excludePkgs.includes(pkg)) {
              return undefined; // 让 Rollup 按默认方式处理
            }
            // 其他库正常拆分
            return `vendor/${pkg}`;
          }
        },
      },
    },
  };
}
