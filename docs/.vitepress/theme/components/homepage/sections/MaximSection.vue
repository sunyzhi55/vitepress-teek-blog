<template>
  <div class="author-content-item maxim">
    <div class="author-content-item-tips">座右铭</div>
    <span class="maxim-title">
      <span style="opacity:.6;margin-bottom:8px">生活明朗，</span> 
      <span>万物可爱。</span>
    </span>
  </div>
</template>

<script setup lang="ts">
// 座右铭组件，展示个人座右铭
</script>

<style scoped>
/* 座右铭卡片样式 - 严格按照安知鱼原版 */
.author-content-item.maxim {
  width: 39%;
  border-radius: 24px;
  /* background: var(--anzhiyu-card-bg); */
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  position: relative;
  padding: 1rem 2rem;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: slide-in 0.6s 0.5s backwards;
  text-align: center;
  min-height: 120px;
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
}

.author-content-item.maxim:hover {
  transform: translateY(-2px);
  box-shadow: var(--anzhiyu-shadow-blackdeep);
}

.author-content-item-tips {
  opacity: 0.8;
  font-size: 12px;
  margin-bottom: 1rem;
  color: var(--anzhiyu-secondtext);
}

.maxim-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  color: var(--anzhiyu-fontcolor);
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
  -webkit-box-align: start;
  -moz-box-align: start;
  -o-box-align: start;
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  text-align: center;
}

.maxim-title span:first-child {
  margin-bottom: 8px;
}

.maxim-title span:last-child {
  background: linear-gradient(120deg, #5b27ff 0%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  .author-content-item.maxim {
    padding: 1rem;
    min-height: 100px;
  }
  
  .maxim-title {
    font-size: 36px;
  }
}
</style>