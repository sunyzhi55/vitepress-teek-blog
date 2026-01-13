<template>
  <div class="copyright-card">
    <!-- 右上角图标 -->
    <TkIcon class="corner-icon" :icon="iconMap.ccIcon" />

    <p class="copyright-item">
      <TkIcon :icon="iconMap.authorIcon" />
      文章作者：<a :href="authorLink" class="author-link">{{ author }}</a>
    </p>
    <p class="copyright-item">
      <TkIcon :icon="iconMap.articleIcon" />
      文章标题：<span class="copyright-info">{{ $frontmatter.title }}</span>
    </p>
    <p class="copyright-item">
      <TkIcon :icon="iconMap.linkIcon" />
      文章链接：
      <a
        :href="fullArticleUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="url-link"
      >
        {{ displayArticleUrl }}
      </a>
    </p>
    <p class="copyright-item">
      <TkIcon :icon="iconMap.copyrightIcon" />
      版权声明：本博客所有文章除特别声明外，均采用
      <a
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        target="_blank"
        rel="noopener noreferrer"
        class="license-link"
      >
        BY-NC-SA 4.0
      </a>
      许可协议。 转载请注明来自
      <a :href="authorLink" class="author-link">{{ author }}</a>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vitepress";
// 导入图标组件
import { TkIcon } from "vitepress-theme-teek";

// ========================= 配置常量 =========================
// 作者信息（非响应式，常量直接定义）
const author = "Hyde";
const authorLink = "https://teek.seasir.top/";

// 路径映射表：长路径 -> 简洁显示路径（配置型数据前置）
const pathMapping = {
  "/10.笔记专栏/01.Teek/04.配置/02.头像配置": "/Twikoo",
  // 扩展提示：新增映射可按格式添加
  // '/原长路径': '/对应短路径',
};

// 图标统一管理（集中存储，避免变量散落）
const iconMap = {
  authorIcon: `<svg t="1756620892345" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4942" width="256" height="256"><path d="M510.492 1020.122c280.726 0 508.563-227.837 508.563-508.563s-227.837-508.562-508.563-508.562-508.563 227.836-508.563 508.563 227.836 508.562 508.563 508.562zM510.492 155.565c84.421 0 152.57 68.147 152.57 152.57 0 84.421-68.147 152.57-152.57 152.57-84.422 0-152.57-68.147-152.57-152.57 0-84.422 68.147-152.57 152.57-152.57zM510.492 557.329c101.204 0 303.612 55.434 305.137 156.637-65.604 98.661-177.998 163.757-305.137 163.757-127.141 0-239.533-65.095-305.137-163.757 1.524-101.203 203.424-156.637 305.137-156.637z" fill="#539dfd" p-id="4943"></path></svg>`,
  articleIcon: `<svg t="1758305903929" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11869" width="256" height="256"><path d="M636.3 608.4H387.8c-9.7 0-17.6 7.7-17.6 17.3 0 9.5 7.9 17.3 17.6 17.3h248.4c9.7 0 17.6-7.7 17.6-17.3 0.1-9.6-7.8-17.3-17.5-17.3z" fill="#539dfd" p-id="11870"></path><path d="M512 0C229.3 0 0.1 229.2 0.1 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m228.5 684.6c0 41.2-34.2 74.8-76.1 74.8H359.8c-42 0-76.1-33.6-76.1-74.8V339.4c0-41.2 34.2-74.8 76.1-74.8h304.6c42 0 76.1 33.6 76.1 74.8v345.2z" fill="#539dfd" p-id="11871"></path><path d="M636.3 494.7H387.8c-9.7 0-17.6 7.7-17.6 17.3 0 9.5 7.9 17.3 17.6 17.3h248.4c9.7 0 17.6-7.7 17.6-17.3 0.1-9.5-7.8-17.3-17.5-17.3zM387.8 415.6h131.3c9.7 0 17.6-7.7 17.6-17.3 0-9.5-7.9-17.3-17.6-17.3H387.8c-9.7 0-17.6 7.7-17.6 17.3 0.1 9.6 7.9 17.3 17.6 17.3z" fill="#539dfd" p-id="11872"></path></svg>`,
  linkIcon: `<svg t="1756621307066" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20628" width="256" height="256"><path d="M0 0h1022.544733v1022.544733H0z" fill-opacity="0" p-id="20629"></path><path d="M0 511.272366c0 183.593259 97.606543 350.918761 255.636183 443.877373s353.242726 90.634647 511.272367 0S1022.544733 694.865625 1022.544733 511.272366C1022.544733 227.7486 794.796133 0 511.272366 0S0 227.7486 0 511.272366z" fill="#539dfd" p-id="20630" data-spm-anchor-id="a313x.search_index.0.i12.16223a81xYgBNH" class="selected"></path><path d="M804.091995 501.976505l-241.692392 213.804808c-20.915688 18.591722-53.451202 4.647931-53.451202-23.239653v-106.902404h-25.563618c-111.550335 0-206.832912 51.127237-257.960149 127.818092-11.619827 16.267757-34.85948 9.295861-37.183445-9.295861-2.323965-11.619827-2.323965-20.915688-2.323965-32.535515 0-160.353606 139.437918-295.143593 320.707212-318.383246v-106.902404c0-27.887584 32.535514-44.155341 53.451202-23.239653l241.692391 232.39653c6.971896 6.971896 9.295861 13.943792 9.295861 23.239653 2.323965 9.295861-2.323965 18.591722-6.971895 23.239653z" fill="#FFFFFF" p-id="20631"></path></svg>`,
  copyrightIcon: `<svg t="1756581951708" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17642" width="256" height="256"><path d="M512 1024C229.232 1024 0 794.768 0 512 0 229.232 229.232 0 512 0 794.768 0 1024 229.232 1024 512 1024 794.768 794.768 1024 512 1024ZM560 240C560 213.488 538.512 192 512 192 485.488 192 464 213.488 464 240L464 592C464 618.512 485.488 640 512 640 538.512 640 560 618.512 560 592L560 240ZM512 736C485.488 736 464 757.488 464 784 464 810.512 485.488 832 512 832 538.512 832 560 810.512 560 784 560 757.488 538.512 736 512 736Z" fill="#539dfd" p-id="17643"></path></svg>`,
  ccIcon: `<svg t="1756582892060" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12422" width="256" height="256"><path d="M512 0c282.624 0 512 229.376 512 512s-229.376 512-512 512S0 794.624 0 512 229.376 0 512 0z m0 256c-141.312 0-256 114.688-256 256a256.1024 256.1024 0 0 0 475.5456 131.6864l-87.808-52.6336a153.6 153.6 0 1 1 0.0512-158.0544l87.7568-52.736A255.9488 255.9488 0 0 0 512 256z" fill="#539dfd" p-id="12423" data-spm-anchor-id="a313x.search_index.0.i11.52943a81UvujRT" class="selected"></path></svg>`,
};

// ========================= 响应式变量 =========================
// 文章链接（需响应式更新）
const fullArticleUrl = ref(""); // 实际跳转用的完整URL
const displayArticleUrl = ref(""); // 页面显示用的简洁URL
const route = useRoute(); // 路由实例

// ========================= 逻辑函数 =========================
/**
 * 更新文章链接（完整URL + 简洁显示URL）
 * 逻辑：1. 移除URL中的hash部分 2. 匹配路径映射表简化显示 3. 赋值给响应式变量
 */
const updateArticleUrl = () => {
  if (typeof window === "undefined") return; // 避免服务端渲染报错

  const currentUrl = new URL(window.location.href);
  // 1. 处理完整URL（移除hash，用于跳转）
  const cleanFullUrl = `${currentUrl.protocol}//${currentUrl.host}${currentUrl.pathname}`;
  
  // 2. 处理显示URL（匹配映射表，无匹配则用原路径）
  const mappedPath = pathMapping[currentUrl.pathname] || currentUrl.pathname;
  const cleanDisplayUrl = `${currentUrl.protocol}//${currentUrl.host}${mappedPath}`;

  // 3. 赋值更新
  fullArticleUrl.value = cleanFullUrl;
  displayArticleUrl.value = cleanDisplayUrl;
};

// ========================= 生命周期 & 监听 =========================
// 初始加载：DOM挂载后更新URL（延迟确保路由初始化完成）
onMounted(() => {
  setTimeout(updateArticleUrl, 100);
});

// 路由变化：路径切换时重新更新URL
watch(
  () => route.path,
  () => {
    setTimeout(updateArticleUrl, 100); // 延迟确保窗口信息同步
  },
  { immediate: true } // 初始时立即执行一次
);
</script>

<style scoped>
.copyright-card {
  font-size: 14px;
  padding: 0.8rem;
  margin-top: 2rem;
  line-height: 1.6;
  border: 1px solid #e2e2e3;
  border-radius: 8px;
  transition: all 0.2s;
  position: relative; /* 用于右上角图标绝对定位 */
}

/* 合并重复的hover样式，避免冗余 */
.copyright-card:hover {
  border-color: var(--vp-c-tip-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px #217af41f, 0 0 0 1px var(--vp-c-brand);
}

/* 右上角图标定位 */
.corner-icon {
  position: absolute;
  top: 6px;
  right: 6px;
}

/* 版权项布局：顶部对齐 + 允许换行 + 长文本强制换行 */
.copyright-item {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  word-break: break-all;
}

/* 版权项间距：上下项之间留白 */
.copyright-item + .copyright-item {
  margin-top: 0.5rem;
}

/* 左侧图标样式：固定尺寸 + 间距 + 不收缩 */
.copyright-item > .tk-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
  margin-top: 4px;
  flex-shrink: 0;
}

/* 链接基础样式：统一过渡效果 */
.copyright-card a {
  text-decoration: none;
  transition: all 0.2s;
}

/* 链接hover样式：统一颜色 + 下划线 */
.copyright-card a:hover {
  color: var(--vp-c-tip-1);
  text-decoration: underline;
}

/* 作者链接 & 文章标题：统一加粗高亮 */
.author-link,
.copyright-info {
  font-weight: 600;
  color: var(--vp-c-tip-1);
}

/* 文章链接 & 许可协议链接：继承基础链接样式（无需重复定义） */
.url-link,
.license-link {
  color: var(--vp-c-tip-1);
}

/* 移动端优化：适配小屏幕 */
@media (max-width: 768px) {
  .copyright-card {
    padding: 1rem;
  }

  /* 链接换行优化：强制换行避免溢出 */
  .url-link,
  .author-link,
  .license-link {
    word-break: break-all;
    overflow-wrap: break-word;
  }
}

/* 超小屏幕补充优化 */
@media (max-width: 480px) {
  .copyright-card {
    padding: 0.75rem;
    font-size: 13px;
  }
}
</style>