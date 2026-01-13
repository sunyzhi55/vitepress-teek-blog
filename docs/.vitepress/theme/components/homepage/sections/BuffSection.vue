<template>
  <div class="author-content-item buff">
    <div class="author-content-item-tips">旅行</div>
    <span class="buff-title">
      <span style="opacity:.6;margin-bottom:8px">欲买桂花同载酒</span> 
      <span>终不似，少年游</span>
    </span>
    <div class="card-background-icon">
      <i class="anzhiyufont anzhiyu-icon-dice-d20"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
// 特长组件，展示个人特长
</script>

<style scoped>
/* 特长卡片样式 - 严格按照安知鱼原版 */
.author-content-item.buff {
  width: 59%;
  height: 200px;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: start;
  -moz-box-align: start;
  -o-box-align: start;
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  background: linear-gradient(120deg, #ff27e8 0, #ff8000 100%);
  color: var(--anzhiyu-white);
  background-size: 200%;
  -webkit-animation: gradient 15s ease infinite;
  -moz-animation: gradient 15s ease infinite;
  -o-animation: gradient 15s ease infinite;
  -ms-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite;
  min-height: 200px;
  height: fit-content;
  border-radius: 24px;
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: slide-in 0.6s 0.5s backwards;
}

.card-content {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: 1rem 2rem;
  height: 100%;
}

.author-content-item-tips {
  opacity: 0.8;
  font-size: 12px;
  margin-bottom: 1rem;
  color: var(--anzhiyu-white);
}

.buff-title {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  color: var(--anzhiyu-white);
}

.buff-title span:first-child {
  margin-bottom: 8px;
}

.buff-title span:last-child {
  font-weight: 800;
}

.card-background-icon {
  font-size: 12rem;
  opacity: .2;
  position: absolute;
  right: 0;
  bottom: -40%;
  -webkit-transform: rotate(30deg);
  -moz-transform: rotate(30deg);
  -o-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
  -webkit-transition: 2s ease-in-out;
  -moz-transition: 2s ease-in-out;
  -o-transition: 2s ease-in-out;
  -ms-transition: 2s ease-in-out;
  transition: 2s ease-in-out;
}

.card-background-icon i {
  font-size: 12rem;
}

.author-content-item.buff:hover .card-background-icon {
  -webkit-transform: rotate(20deg);
  -moz-transform: rotate(20deg);
  -o-transform: rotate(20deg);
  -ms-transform: rotate(20deg);
  transform: rotate(20deg);
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
  .author-content-item.buff {
    width: 100% !important;
    min-height: 150px;
    min-height: 200px;
    height: auto;
  }
  
  .card-content {
    padding: 1rem;
  }
  
  .buff-title {
    font-size: 36px;
  }
  
  .card-background-icon {
    font-size: 8rem;
    right: -20px;
    bottom: -30%;
  }
  
  .card-background-icon i {
    font-size: 8rem;
  }
}
</style>