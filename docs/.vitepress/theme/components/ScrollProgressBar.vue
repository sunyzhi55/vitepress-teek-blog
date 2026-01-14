<template>
  <div ref="progressBar" class="progress-bar" :style="{ width: progress + '%' }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const progressBar = ref(null);
const progress = ref(0);

// 节流函数
const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;

  return function (...args) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          func.apply(this, args);
          lastExecTime = Date.now();
        },
        delay - (currentTime - lastExecTime)
      );
    }
  };
};

// 缓存DOM尺寸
let cachedScrollHeight = 0;
let cachedClientHeight = 0;

const handleScroll = () => {
  // 使用requestAnimationFrame避免强制重排
  requestAnimationFrame(() => {
    // 缓存尺寸，避免频繁查询
    if (cachedScrollHeight === 0 || cachedClientHeight === 0) {
      cachedScrollHeight = document.documentElement.scrollHeight;
      cachedClientHeight = document.documentElement.clientHeight;
    }

    const totalHeight = cachedScrollHeight - cachedClientHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    progress.value = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
  });
};

// 节流版本的滚动处理（每50ms执行一次）
const throttledHandleScroll = throttle(handleScroll, 50);

onMounted(() => {
  // 初始化时计算一次
  handleScroll();

  // 添加节流后的滚动事件监听
  window.addEventListener("scroll", throttledHandleScroll, { passive: true });

  // 监听窗口大小变化，重置缓存
  window.addEventListener(
    "resize",
    () => {
      cachedScrollHeight = 0;
      cachedClientHeight = 0;
    },
    { passive: true }
  );
});

onUnmounted(() => {
  window.removeEventListener("scroll", throttledHandleScroll);
  window.removeEventListener("resize", () => {});
});
</script>

<style scoped>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(
    107deg,
    rgb(255, 182, 133) -30.6%,
    rgb(255, 111, 29) -1.11%,
    rgb(252, 181, 232) 39.14%,
    rgb(135, 148, 255) 73.35%,
    rgb(60, 112, 255) 97.07%,
    rgb(60, 112, 255) 118.97%
  );
  z-index: 9999;
}
</style>
