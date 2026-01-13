<script setup lang="ts">
import { PropType, VNode } from 'vue'
import { TkIcon } from 'vitepress-theme-teek'
import { TkMessage } from "vitepress-theme-teek";

const props = defineProps({
  show: { type: Boolean, default: true },
  icon: { type: [Object, String] as PropType<string | VNode>, default: null },
  scrollToComment: { type: Function as PropType<() => void>, required: true }
})

const svg = `<svg t="1759322030202" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4525" width="256" height="256"><path d="M513.77 102.4c-246.32 0-446 183.56-446 410s199.68 410 446 410a486.69 486.69 0 0 0 82.43-7h234.57a100 100 0 0 0 100-100V658.11a380 380 0 0 0 29-145.71c0-226.4-199.68-410-446-410z m324.61 517.48l-7.59 18.36V765.4a50 50 0 0 1-50 50H587.67l-8.4 1.44-1.95 0.33a386.7 386.7 0 0 1-63.55 5.22c-192.88 0-346-140.76-346-310s153.12-310 346-310 346 140.75 346 310a279.79 279.79 0 0 1-21.39 107.49z" fill="#ffffff" p-id="4526" data-spm-anchor-id="a313x.search_index.0.i2.49223a81qw4Obc" class="selected"></path><path d="M623.77 379.4h-220a50 50 0 0 0 0 100h220a50 50 0 0 0 0-100zM593.77 545.4h-160a50 50 0 0 0 0 100h160a50 50 0 0 0 0-100z" fill="#ffffff" p-id="4527" data-spm-anchor-id="a313x.search_index.0.i3.49223a81qw4Obc" class="selected"></path></svg>`

// 滚动到评论区的函数
const scrollToComment = () => {
  const commentElement = document.querySelector(
    "#twikoo, .my-message-section, .message-card"
  );
  if (commentElement) {
    commentElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // 显示成功消息提示
    TkMessage({
      message: "已抵达评论区✨",
      type: "success",
    });
  } else {
    // 如果没有找到评论区域，显示提示
    TkMessage({
      message: "未找到留链区",
      type: "warning",
    });
  }
};

</script>

<template>
  <div
    v-if="show"
    title="滚动到评论区"
    class="scroll-to-comment-btn"
    @click="scrollToComment"
    role="button"
    aria-label="滚动到评论区"
  >
    <!-- <TkIcon :icon="icon" aria-hidden="true" /> -->
     <TkIcon :icon="svg"  size="24"/>
  </div>
</template>

<style scoped>
.scroll-to-comment-btn {
  position: fixed;
  right: 29px;
  bottom: 39px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: var(--vp-c-brand-1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px var(--vp-c-brand-1);
  transition: all 0.2s ease;
  z-index: 9999;
}

.scroll-to-comment-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

/* 移动端适配（断点：768px 以下，覆盖主流手机/小平板） */
@media (max-width: 768px) {
  .scroll-to-comment-btn {
    /* 1. 增大点击区域：移动端触控最小建议 44x44px，避免误触 */
    width: 40px;
    height: 40px;

    /* 2. 调整位置：远离屏幕边缘，避免与系统导航栏（如底部手势区）冲突 */
    right: 15px; /* 右侧距离缩小，适配窄屏 */
    bottom: 24px; /* 底部距离增加，避开手机底部导航/手势区 */

    /* 3. 轻量化阴影：移动端屏幕小，过浓阴影显压抑 */
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  }

  .scroll-to-comment-btn:hover {
    /* 移动端 hover 效果弱化（触摸反馈为主），避免过度动画 */
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
}

/* 小屏手机额外适配（如 375px 以下，可选） */
@media (max-width: 375px) {
  .scroll-to-comment-btn {
    right: 12px;
    bottom: 28px;
  }
}
</style>