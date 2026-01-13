<template>
  <div class="hello-about" ref="helloContainer">
    <div class="cursor" ref="cursor"></div>
    <div class="shapes">
      <div class="shape shape-1" ref="shape1"></div>
      <div class="shape shape-2" ref="shape2"></div>
      <div class="shape shape-3" ref="shape3"></div>
    </div>
    <div class="content">
      <h1>Hello there!</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useMouseTracking } from '../../composables/useAnimation'
import { useMediaQuery } from '../../composables/useUtils'

const helloContainer = ref<HTMLElement>()
const cursor = ref<HTMLElement>()
const shape1 = ref<HTMLElement>()
const shape2 = ref<HTMLElement>()
const shape3 = ref<HTMLElement>()

const { setupMouseTracking } = useMouseTracking()
const { isMobile } = useMediaQuery()

let cleanup: (() => void) | undefined

onMounted(() => {
  // 仅在非移动端启用鼠标跟踪
  if (!isMobile.value && helloContainer.value && cursor.value) {
    cleanup = setupMouseTracking(
      '.hello-about',
      '.cursor', 
      '.shape'
    )
  }
})

onUnmounted(() => {
  if (cleanup) {
    cleanup()
  }
})
</script>

<style scoped>
/* Hello动画区域 - 严格按照安知鱼原版 */
.hello-about {
  margin: 20px auto;
  border-radius: 24px;
  background: var(--anzhiyu-card-bg);
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  position: relative;
  overflow: hidden;
  user-select: none;
  height: 315px;
  animation: slide-in 0.6s 0.4s backwards;
}

.shapes {
  position: relative;
  height: 315px;
  width: 100%;
  background: #2128bd;
  overflow: hidden;
}

.shape {
  will-change: transform;
  position: absolute;
  border-radius: 50%;
}

.shape.shape-1 {
  background: #005ffe;
  width: 650px;
  height: 650px;
  margin: -325px 0 0 -325px;
}

.shape.shape-2 {
  background: #ffe5e3;
  width: 440px;
  height: 440px;
  margin: -220px 0 0 -220px;
}

.shape.shape-3 {
  background: #ffcc57;
  width: 270px;
  height: 270px;
  margin: -135px 0 0 -135px;
}

.hello-about .content {
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 315px;
  width: 100%;
  background: #fff;
  mix-blend-mode: screen;
}

.hello-about h1 {
  font-size: 200px;
  color: #000;
  margin: 0;
  text-align: center;
  font: inherit;
  vertical-align: baseline;
  line-height: 1;
  font-size: calc(0.0989119683 * 100vw + 58.5558852621px);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cursor {
  position: absolute;
  background: #2128bd;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  will-change: transform;
  user-select: none;
  pointer-events: none;
  z-index: 3;
}

/* 动画效果 */
@keyframes slide-in {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (min-width: 419px) {
  .hello-about h1 {
    font-size: calc(0.0989119683 * 100vw + 58.5558852621px);
  }
}

@media (max-width: 768px) {
  .hello-about {
    margin: 20px 0 auto;
    height: 250px;
  }
  
  .hello-about .shapes {
    height: 250px;
  }
  
  .hello-about .content {
    height: 250px;
  }
  
  .hello-about h1 {
    font-size: 2rem;
  }
  
  .cursor {
    display: none;
  }
}

@media (max-width: 480px) {
  .hello-about {
    height: 200px;
    margin: 15px 0 auto;
  }
  
  .hello-about .shapes {
    height: 200px;
  }
  
  .hello-about .content {
    height: 200px;
  }
  
  .hello-about h1 {
    font-size: calc(0.0989119683 * 100vw + 58.5558852621px);
  }
}

/* 暗色主题 */
[data-theme=dark] .hello-about .content {
  background: transparent;
}

[data-theme=dark] .hello-about h1 {
  color: var(--anzhiyu-white);
}
</style>