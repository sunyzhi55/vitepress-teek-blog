<template>
  <div class="author-section">
    <!-- 头像和标签区域 -->
    <div class="author-box">
      <!-- 左侧标签 -->
      <div class="author-tag-left hidden-mobile">
        <span 
          v-for="tag in leftTags" 
          :key="tag.id"
          class="author-tag"
        >
          {{ tag.emoji }} {{ tag.text }}
        </span>
      </div>

      <!-- 头像 -->
      <div class="author-img">
        <img 
          class="no-lightbox" 
          :src="personalInfo.avatar" 
          :alt="personalInfo.name"
        >
        <div class="image-dot"></div>
      </div>

      <!-- 右侧标签 -->
      <div class="author-tag-right hidden-mobile">
        <span 
          v-for="tag in rightTags" 
          :key="tag.id"
          class="author-tag"
        >
          {{ tag.emoji }} {{ tag.text }}
        </span>
      </div>
    </div>

    <!-- 标题区域 -->
    <div class="author-title-section">
      <p class="p center logo large">关于我</p>
      <p class="p center small">{{ personalInfo.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePersonalData } from '../data/useData'

const { personalInfo, leftTags, rightTags } = usePersonalData()
</script>

<style scoped>
/* 头像区域样式 - 严格按照安知鱼原版 */
.author-section {
  margin-bottom: 2rem;
}

.author-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 16px 0;
  animation: slide-in 0.6s 0.1s backwards;
}

.author-tag-left {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.author-tag-left .author-tag:first-child,
.author-tag-left .author-tag:last-child {
  margin-right: -16px;
}

.author-tag-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.author-tag-right .author-tag:first-child,
.author-tag-right .author-tag:last-child {
  margin-left: -16px;
}

.author-tag {
  transform: translate(0, -4px);
  padding: 1px 8px;
  /* background: var(--anzhiyu-card-bg); */
  border: var(--style-border-always);
  border-radius: 40px;
  margin-top: 6px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: var(--anzhiyu-shadow-lightblack);
  animation: 6s ease-in-out 0s infinite normal both running floating;
}

/* 左侧标签动画延迟 */
.author-tag-left .author-tag:nth-child(1) {
  animation-delay: 0s;
}

.author-tag-left .author-tag:nth-child(2) {
  animation-delay: 0.6s;
}

.author-tag-left .author-tag:nth-child(3) {
  animation-delay: 1.2s;
}

.author-tag-left .author-tag:nth-child(4) {
  animation-delay: 1.8s;
}

/* 右侧标签动画延迟 */
.author-tag-right .author-tag:nth-child(1) {
  animation-delay: 0s;
}

.author-tag-right .author-tag:nth-child(2) {
  animation-delay: 0.6s;
}

.author-tag-right .author-tag:nth-child(3) {
  animation-delay: 1.2s;
}

.author-tag-right .author-tag:nth-child(4) {
  animation-delay: 1.8s;
}

.author-title-section {
  text-align: center;
  margin-top: 20px;
  animation: slide-in 0.6s 0.2s backwards;
}

.author-img {
  margin: 0 30px;
  border-radius: 50%;
  width: 180px;
  height: 180px;
  position: relative;
  background: var(--anzhiyu-secondbg);
  user-select: none;
  transition: 0.3s;
}

.author-img img {
  border-radius: 50%;
  overflow: hidden;
  width: 180px;
  height: 180px;
  object-fit: cover;
  transition: all 0.3s ease;
}

.author-img:hover {
  transform: scale(1.1);
}

.author-img:before {
  content: '';
  transition: 1s;
  width: 30px;
  height: 30px;
  background: var(--anzhiyu-green);
  position: absolute;
  border-radius: 50%;
  border: 5px solid var(--anzhiyu-background);
  bottom: 5px;
  right: 10px;
  z-index: 2;
}

/* 标题样式 - 严格按照安知鱼原版 */
.p.center {
  text-align: center;
  margin: 0;
}

.p.logo.large {
  font-size: 2em;
  font-weight: 700;
  color: var(--anzhiyu-fontcolor);
  margin: 0.67em 0;
  line-height: 1.2;
}

.p.small {
  font-size: var(--global-font-size);
  color: var(--anzhiyu-secondtext);
  margin: 0.5em 0;
  line-height: 1.5;
}

/* 动画效果 */
@keyframes floating {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
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

/* 移动端响应式 */
@media screen and (max-width: 768px) {
  .author-img {
    width: 120px;
    height: 120px;
  }
  
  .author-img img {
    width: 120px;
    height: 120px;
  }
  
  .author-img:before {
    bottom: -5px;
    right: -5px;
  }

  .p.logo.large {
    font-size: 28px;
  }
}
</style>