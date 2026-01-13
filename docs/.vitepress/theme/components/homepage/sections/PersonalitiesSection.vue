<template>
  <div class="author-content-item personalities">
    <div class="author-content-item-tips">性格</div>
    <span class="author-content-item-title">防守者</span>
    <div class="title2" style="color:#ac899c">ISFJ-A</div>
    <div class="post-tips">
      在 <a href="https://www.16personalities.com/" target="_blank" rel="noopener nofollow">16personalities</a> 
      了解更多关于 <a target="_blank" rel="noopener external nofollow" 
      href="https://www.16personalities.com/ch/esfj-%E4%BA%BA%E6%A0%BC">防守者</a>
    </div>
    <div class="image">
      <img 
        class="no-lightbox"
        src="https://www.16personalities.com/static/images/personality-types/avatars/email/large/ISFJ_male.png?v=1"
        onerror="this.onerror=null,this.src='https://bu.dusays.com/2023/03/03/6401a79030db5.png'"
        data-lazy-src="https://npm.elemecdn.com/anzhiyu-blog@2.0.8/img/svg/ESFJ-A.svg"
        alt="人格"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
// 性格类型组件，展示16personalities测试结果
</script>

<style scoped>
/* 性格类型卡片样式 - 严格按照安知鱼原版 */
.author-content-item.personalities {
  width: 49%;
  border-radius: 24px;
  /* background: var(--anzhiyu-card-bg); */
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  position: relative;
  padding: 1rem 2rem;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: slide-in 0.6s 0.4s backwards;
}

.author-content-item.personalities:hover {
  transform: translateY(-2px);
  box-shadow: var(--anzhiyu-shadow-blackdeep);
}

.author-content-item-tips {
  opacity: 0.8;
  font-size: 12px;
  margin-bottom: 0.5rem;
  color: var(--anzhiyu-secondtext);
}

.author-content-item-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.5rem;
  color: var(--anzhiyu-fontcolor);
  display: block;
}

.title2 {
  font-size: 36px;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.post-tips {
  font-size: 14px;
  color: var(--anzhiyu-gray);
  position: absolute;
  bottom: 1rem;
  left: 2rem;
}

.post-tips a {
  color: var(--anzhiyu-gray);
  text-decoration: none;
  transition: all 0.3s ease;
}

.post-tips a:hover {
  color: var(--anzhiyu-main);
}

.image {
position: absolute;
right: 30px;
top: 10px;
width: 220px;
}

.image img {
  max-width: 100%;
  height: auto;
    margin: 0 auto 20px;
  transition: all 0.3s ease;
}

.image img:hover {
  transform: scale(1.05);
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
  .author-content-item.personalities {
    height: 200px;
    width: 100% !important;
    padding: 1rem;
  }
    .post-tips {
    left: auto;
    }
  
  .author-content-item-title {
    font-size: 28px;
  }
  
  .title2 {
    font-size: 20px;
  }
  
  .image img {
    max-width: 150px;
  }
}
</style>