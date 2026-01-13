<template>
  <div class="author-content-item like-technology"
       style="background:url(https://img02.anheyu.com/adminuploads/1/2022/09/24/632f0dd8f33c6.webp) top/cover no-repeat">
    <div class="card-content">
      <div class="author-content-item-tips">关注偏好</div>
      <span class="author-content-item-title">数码科技</span>
      <div class="content-bottom">
        <div class="tips">手机、电脑软硬件</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 关注偏好数码科技组件
</script>

<style scoped>
/* 关注偏好数码科技卡片样式 - 严格按照安知鱼原版 */
.author-content-item.like-technology {
  width: 49%;
  min-height: 230px;
  color: var(--anzhiyu-white);
  border-radius: 24px;
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  position: relative;
  padding: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: slide-in 0.6s 0.7s backwards;
  background-size: cover !important;
}

.author-content-item.like-technology:hover {
  transform: translateY(-2px);
  box-shadow: var(--anzhiyu-shadow-blackdeep);
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 1rem 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 24px;
  color: var(--anzhiyu-white);
  min-height: 230px;
}

.author-content-item-tips {
  opacity: 0.9;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.author-content-item-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
  color: var(--anzhiyu-white);
  margin-bottom: auto;
}

.content-bottom {
  margin-top: auto;
}

.tips {
  font-size: 16px;
  line-height: 1.6;
  font-weight: 500;
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
@media screen and (max-width: 768px) {
  .author-content-item.like-technology {
    width: 100% !important;
    min-height: 230px;
  }
  
  .card-content {
    padding: 1rem;
    min-height: 230px;
  }
  
  .author-content-item-title {
    font-size: 36px;
  }
}
</style>