<template>
  <div id="clock">
    <div class="time">
      <span class="hour">{{ hours }}</span>
      <span class="separator">:</span>
      <span class="minute">{{ minutes }}</span>
      <span class="separator">:</span>
      <span class="second">{{ seconds }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from "vue";

// 定时器管理
const timerID = shallowRef<number | null>(null);

// 时间状态 - 拆分小时、分钟、秒
const hours = shallowRef<string>('00');
const minutes = shallowRef<string>('00');
const seconds = shallowRef<string>('00');

// 初始化时钟
const initClock = () => {
  if (timerID.value !== null) {
    cancelAnimationFrame(timerID.value);
  }
  timerID.value = requestAnimationFrame(animateClock);
};

// 动画循环函数
function animateClock() {
  const now = new Date();
  const currentSeconds = now.getSeconds();

  // 只有当秒数变化时才更新（避免同一秒内多次更新）
  if (currentSeconds !== parseInt(seconds.value)) {
    seconds.value = zeroPadding(currentSeconds, 2);
  }

  // 分钟和小时变化频率低，单独判断更新
  const currentMinutes = now.getMinutes();
  if (currentMinutes !== parseInt(minutes.value)) {
    minutes.value = zeroPadding(currentMinutes, 2);
  }

  const currentHours = now.getHours();
  if (currentHours !== parseInt(hours.value)) {
    hours.value = zeroPadding(currentHours, 2);
  }

  timerID.value = requestAnimationFrame(animateClock);
}

// 数字补零函数
function zeroPadding(num: number, digit: number): string {
  return String(num).padStart(digit, '0');
}

onMounted(() => {
  // 组件挂载时初始化
  initClock();
})

// 组件卸载时清理
onUnmounted(() => {
  if (timerID.value !== null) {
    cancelAnimationFrame(timerID.value);
  }
});
</script>

<style scoped lang="scss">
#clock {
  order: 99;
  text-align: center;
  margin-left: 15px;
  display: flex;
  align-items: center;

  .time {
    /* 隔离渲染范围 */
    contain: content;
    letter-spacing: 0.05em;
    font-size: 16px;
    font-weight: bold;
  }

  .time span{
    /* 将每个部分用 inline-block 包裹，形成独立“绘制单元”，避免局部更新，整个重绘的问题 */
    display: inline-block;
  }
}

/* 视口宽度 ≤ 767px 时生效（移动端），调整时间显示位置 */
@media (max-width: 767px) {
  // 移动端导航栏吸顶
  #clock{
    order: 0;
  }
}

/* 父级有.full-img-nav-bar类时的样式（Banner范围内） */
:deep(.full-img-nav-bar #clock) {
  color: var(--vp-c-white);
  text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);

  /* 暗色模式下的样式 */
/*  :deep(html.dark .full-img-nav-bar #clock) {
    color: #b9199b;
  }*/
}

/* 父级没有.full-img-nav-bar类时的样式（滚动离开Banner后） */
:deep(:not(.full-img-nav-bar) #clock) {
  color: var(--vp-c-text-1);
  text-shadow: none;

  /* 暗色模式下的样式 */
/*  :deep(html.dark :not(.full-img-nav-bar) #clock) {
    color: #daf6ff;
  }*/
}
</style>
