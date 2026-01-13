<template>
  <div class="author-content">
    <!-- 自我介绍和追求 -->
    <div class="intro-pursuit-container">
      <div class="author-content-item myInfoAndSayHello">
        <div class="title1">你好，很高兴认识你👋</div>
        <div class="title2">
          我叫 <span class="inline-word">{{ personalInfo.name }}</span>
        </div>
        <div class="title1">
          是一名 {{ personalInfo.title }}
        </div>
      </div>

      <div class="author-content-item aboutsiteTips">
        <div class="author-content-item-tips">追求</div>
        <h2>
          源于<br>
          热爱而去 <span class="inline-word">感受</span>
          <div class="mask">
            <span class="first-tips" data-show>体验</span>
            <span>生活</span>
            <span data-up>程序</span>
          </div>
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePersonalData } from '../data/useData'
import { useTextRotation } from '../data/useAnimation'

const { personalInfo } = usePersonalData()
const { startRotation } = useTextRotation()

onMounted(() => {
  // 启动文字轮播动画
  startRotation('.aboutsiteTips .mask span', 2000)
})
</script>

<style scoped>
/* 自我介绍和追求区域 */
.author-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.5rem;
}

.intro-pursuit-container {
  width: 100%;
  display: flex;
  gap: 1%;
  align-items: stretch;
  justify-content: space-between;
  animation: slide-in 0.6s 0.3s backwards;
}

.myInfoAndSayHello {
  width: 59% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--anzhiyu-white);
  background: linear-gradient(120deg, #5b27ff 0%, #00d4ff 100%) !important;
  background-size: 200%;
  animation: gradient 15s ease infinite;
  border-radius: 24px;
  padding: 1rem 2rem;
  box-shadow: var(--anzhiyu-shadow-border);
  border: var(--style-border-always);
}

.aboutsiteTips {
  width: 39%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  min-height: 200px;
  border-radius: 24px;
  /* background: var(--anzhiyu-card-bg); */
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  padding: 1rem 2rem;
  transition: all 0.3s ease;
}

/* 文本样式 */
.title1 {
  opacity: 0.8;
  line-height: 1.3;
  color: inherit;
  margin: 0.5rem 0;
  font-size: var(--global-font-size);
}

.title2 {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  margin: 0.5rem 0;
  color: inherit;
}

.inline-word {
  word-break: keep-all;
  white-space: nowrap;
  font-weight: inherit;
}

.author-content-item-tips {
  opacity: 0.8;
  font-size: 12px;
  margin-bottom: 0.5rem;
}

.aboutsiteTips h2 {
  margin-right: auto;
  font-size: 36px;
  font-family: Helvetica;
  line-height: 1.06;
  letter-spacing: -0.02em;
  color: var(--anzhiyu-fontcolor);
  margin-top: 0;
  margin-bottom: 0;
}

.aboutsiteTips .mask {
  height: 36px;
  position: relative;
  overflow: hidden;
  margin-top: 4px;
}

.aboutsiteTips .mask span {
  display: block;
  box-sizing: border-box;
  position: absolute;
  top: 36px;
  padding-bottom: var(--offset);
  background-size: 100% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-repeat: no-repeat;
  font-weight: 600;
  font-size: 36px;
  line-height: 36px;
  will-change: transform;
  transform: translateY(0px);
}

.aboutsiteTips .mask span[data-show] {
  transform: translateY(-100%);
  transition: 0.5s transform ease-in-out;
}

.aboutsiteTips .mask span[data-up] {
  transform: translateY(-200%);
  transition: 0.5s transform ease-in-out;
}

.aboutsiteTips .mask span:nth-child(1) {
  background-image: linear-gradient(45deg, #0ecffe 50%, #07a6f1);
}

.aboutsiteTips .mask span:nth-child(2) {
  background-image: linear-gradient(45deg, #18e198 50%, #0ec15d);
}

.aboutsiteTips .mask span:nth-child(3) {
  background-image: linear-gradient(45deg, #8a7cfb 50%, #633e9c);
}

.aboutsiteTips .mask span.first-tips {
  transform: translateY(-100%);
}

.first-tips {
  color: var(--anzhiyu-main) !important;
}

/* 动画效果 */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

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
@media screen and (max-width: 768px) {
  .intro-pursuit-container {
    flex-direction: column;
  }
  
  .myInfoAndSayHello,
  .aboutsiteTips {
    width: 100% !important;
    margin-top: 1rem;
  }
  
  .title2 {
    font-size: 24px;
  }
}
</style>