<template>
  <!-- Transition 控制整个遮罩的进入/离开 -->
  <Transition name="fade" mode="out-in">
    <div v-show="isTransitioning" class="transition-mask">
      <div class="loader">
        <div class="spinner"></div>
        <p>拼命加载中...</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vitepress";

const router = useRouter();
const isTransitioning = ref(false);
let transitionStart = 0;

// 保存 VitePress 内部默认的路由钩子
const originalBeforeRouteChange = router.onBeforeRouteChange;
const originalAfterRouteChange = router.onAfterRouteChange;

// 路由开始切换时
const handleRouteStart = () => {
  transitionStart = Date.now();
  isTransitioning.value = true;
};

// 路由完成切换时
const handleRouteComplete = () => {
  const elapsed = Date.now() - transitionStart;
  // 确保动画至少显示 600ms，提升视觉体验
  const delay = Math.max(0, 600 - elapsed);

  setTimeout(() => {
    isTransitioning.value = false;
  }, delay);
};

// 重写路由切换前的钩子
router.onBeforeRouteChange = (to) => {
  originalBeforeRouteChange && originalBeforeRouteChange(to);
  handleRouteStart();
};

// 重写路由切换后的钩子
router.onAfterRouteChange = (to) => {
  originalAfterRouteChange && originalAfterRouteChange(to);
  handleRouteComplete();
};

// 首次加载时不显示遮罩，只用于路由切换
// onBeforeMount(handleRouteStart);
// onMounted(handleRouteComplete);
</script>

<style scoped>
/* 过渡遮罩层样式，使用 scoped 避免样式污染 */
.transition-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; /* 让加载图标和文字垂直排列 */
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.95); /* 调整透明度，增强遮罩效果 */
  z-index: 9999;
}

.loader {
  text-align: center;
}

.spinner {
  width: 50px; /* 增大加载图标，更醒目 */
  height: 50px;
  margin: 0 auto 12px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* ✅ 添加过渡类 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
