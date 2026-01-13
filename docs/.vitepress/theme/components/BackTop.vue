<template>
  <Transition name="back">
    <div v-show="showBackTop"
         class="vitepress-backTop-main"
         :class="{ 'launching': isLaunching }"
         title="返回顶部"
         @click="scrollToTop()">
      <!-- 进度条 -->
      <svg class="progress-circle" width="70" height="70" viewBox="0 0 70 70">
        <circle class="progress-circle-bg" cx="35" cy="35" r="30" fill="none" stroke="rgba(255, 255, 255, 0.2)"
                stroke-width="4" />
        <circle class="progress-circle-bar" cx="35" cy="35" r="30" fill="none" stroke="rgba(255, 255, 255, 0.9)"
                stroke-width="4" :stroke-dasharray="progressCircumference" :stroke-dashoffset="progressOffset"
                transform="rotate(-90 35 35)" />
      </svg>
      <!-- 火箭图标 -->
      <svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFF" d="M752.736 431.063C757.159 140.575 520.41 8.97 504.518 0.41V0l-0.45 0.205-0.41-0.205v0.41c-15.934 8.56-252.723 140.165-248.259 430.653-48.21 31.457-98.713 87.368-90.685 184.074 8.028 96.666 101.007 160.768 136.601 157.287 35.595-3.482 25.232-30.31 25.232-30.31l12.206-50.095s52.47 80.569 69.304 80.528c15.114-1.23 87-0.123 95.6 0h0.82c8.602-0.123 80.486-1.23 95.6 0 16.794 0 69.305-80.528 69.305-80.528l12.165 50.094s-10.322 26.83 25.272 30.31c35.595 3.482 128.574-60.62 136.602-157.286 8.028-96.665-42.475-152.617-90.685-184.074z m-248.669-4.26c-6.758-0.123-94.781-3.359-102.891-107.192 2.95-98.714 95.97-107.438 102.891-107.93 6.964 0.492 99.943 9.216 102.892 107.93-8.11 103.833-96.174 107.07-102.892 107.192z m-52.019 500.531c0 11.838-9.42 21.382-21.012 21.382a21.217 21.217 0 0 1-21.054-21.34V821.74c0-11.797 9.421-21.382 21.054-21.382 11.591 0 21.012 9.585 21.012 21.382v105.635z m77.333 57.222a21.504 21.504 0 0 1-21.34 21.626 21.504 21.504 0 0 1-21.34-21.626V827.474c0-11.96 9.543-21.668 21.299-21.668 11.796 0 21.38 9.708 21.38 21.668v157.082z m71.147-82.043c0 11.796-9.42 21.34-21.053 21.34a21.217 21.217 0 0 1-21.013-21.34v-75.367c0-11.755 9.421-21.299 21.013-21.299 11.632 0 21.053 9.544 21.053 21.3v75.366z"></path>
      </svg>
    </div>
  </Transition>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
import { TkMessage } from "vitepress-theme-teek";

// 是否显示返回顶部
const showBackTop = ref(false);
// 滚动进度 (0-1)
const scrollProgress = ref(0);

// 进度条周长
const progressCircumference = computed(() => 2 * Math.PI * 30);
// 进度条偏移量
const progressOffset = computed(() => {
  return progressCircumference.value * (1 - scrollProgress.value);
});

// 是否正在执行发射动画
const isLaunching = ref(false);

const scrollToTop = () => {
  if (isLaunching.value) return;

  // 设置发射状态
  isLaunching.value = true;

  // 立即开始滚动，同时触发发射动画
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // 监听滚动结束，重置发射状态
  const checkScrollEnd = () => {
    if (window.scrollY <= 0) {
      // 到达顶部后重置状态
      setTimeout(() => {
        isLaunching.value = false;
        // 显示提示消息
        TkMessage({
          message: "已达到顶部🎉.",
          type: "success",
        });
      }, 300);
      window.removeEventListener('scroll', checkScrollEnd);
    }
  };

  window.addEventListener('scroll', checkScrollEnd);
}

// 计算滚动进度
const calculateScrollProgress = () => {
  // 获取页面总高度（包括滚动部分）
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  // 获取当前滚动位置
  const currentScroll = window.scrollY;
  // 计算滚动百分比 (0-1)
  // 当滚动到底部或接近底部时，确保返回1
  if (totalHeight <= 0) return 0; // 防止除以零
  if (currentScroll >= totalHeight - 1) return 1; // 接近底部时返回1
  return Math.min(Math.max(currentScroll / totalHeight, 0), 1);
}

const updateScrollProgress = () => {
  // 更新是否显示返回顶部按钮（这个可以每帧更新）
  showBackTop.value = Boolean(window.scrollY > 100);
  // 更新滚动进度
  scrollProgress.value = calculateScrollProgress();
}

const onScroll = () => {
  // 使用requestAnimationFrame最佳的性能和准确性平衡
  requestAnimationFrame(updateScrollProgress);
}

// 监听滚动事件
onMounted(() => {
  window.addEventListener("scroll", onScroll);
  // 初始化进度
  scrollProgress.value = calculateScrollProgress();
});

// 移除监听事件
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>

<style lang="css" scoped>
.vitepress-backTop-main {
  z-index: 999;
  position: fixed;
  bottom: 40px;
  right: 30px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 20px rgba(107, 70, 193, 0.3);
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  /* 低宽度下和下方按钮对齐 */
  .vitepress-backTop-main {
    bottom: 85px;
    right: 25px;
  }
}

@media (max-width: 720px) {
  /* 低宽度下和下方按钮对齐 */
  .vitepress-backTop-main {
    bottom: 70px;
    right: 16px;
  }
}

.vitepress-backTop-main:hover {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(107, 70, 193, 0.4);
}

/* 进度圆环 */
.progress-circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
}

.progress-circle-bg {
  stroke-linecap: round;
}

.progress-circle-bar {
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
  filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.5));
}

/* 火箭图标 */
.icon {
  width: 50%;
  height: 50%;
  z-index: 2;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
  transition: transform 0.3s ease;
}

.vitepress-backTop-main:hover .icon {
  transform: translateY(-5px);
}

/* 发射动画 - 修改为保持可见状态 */
@keyframes launch {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  20% {
    transform: translateY(-20px) scale(0.9);
    opacity: 0.9;
  }

  100% {
    transform: translateY(-30px) scale(0.8);
    opacity: 0.8;
  }
}

/* 发射状态 */
.launching .icon {
  animation: launch 1s ease-in forwards;
}

/* 发射轨迹 - 修改为持续可见 */
.launching::after {
  content: '';
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 0;
  background: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8));
  border-radius: 50%;
  animation: rocket-trail 0.5s ease-out forwards;
}

@keyframes rocket-trail {
  0% {
    height: 0;
    opacity: 0;
  }

  100% {
    height: 30px;
    opacity: 0.8;
  }

  50% {
    height: 20px;
    opacity: 1;
  }

  100% {
    height: 30px;
    opacity: 0;
  }
}

/* 进入 退出动画 */
.back-enter-active,
.back-leave-active {
  transition: opacity 0.5s ease;
}

.back-enter-from,
.back-leave-to {
  opacity: 0;
}
</style>
