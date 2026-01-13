<template>
  <div class="author-content-item myphoto">
    <img 
      class="author-content-img no-lightbox" 
      alt="自拍" 
      src="/map-lightbox.png"
    >
  </div>
</template>

<script setup lang="ts">
// 个人照片组件，展示自拍照片
</script>

<style scoped>
/* 个人照片卡片样式 - 严格按照安知鱼原版 */
.author-content-item.myphoto {
  width: 49%;
  border-radius: 24px;
  background: var(--anzhiyu-card-bg);
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  position: relative;
  padding: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: slide-in 0.6s 0.4s backwards;
}

.author-content-item.myphoto:hover {
  transform: translateY(-2px);
  box-shadow: var(--anzhiyu-shadow-blackdeep);
}

.author-content-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  transition: all 0.3s ease;
  min-height: 250px;
}

.author-content-img:hover {
  transform: scale(1.02);
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
  .author-content-item.myphoto {
    width: 100% !important;
  }
  
  .author-content-img {
    min-height: 200px;
  }
}
</style>