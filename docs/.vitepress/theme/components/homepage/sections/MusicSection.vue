<template>
  <div class="author-content-item like-music"
       style="background:url(https://blog.strarry.top/static/music.jpg) top/cover no-repeat">
    <div class="card-content">
      <div class="author-content-item-tips">音乐偏好</div>
      <span class="author-content-item-title">周杰伦、孙燕姿、华语流行</span>
      <div class="content-bottom">
        <div class="tips">跟 Hyde 一起欣赏更多音乐</div>
      </div>
      <div class="banner-button-group">
        <a class="banner-button" onclick="pjax.loadUrl('/music')">
          <i class="anzhiyufont anzhiyu-icon-arrow-circle-right"></i> 
          <span class="banner-button-text">更多推荐</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 音乐偏好组件
</script>

<style scoped>
/* 音乐偏好卡片样式 - 严格按照安知鱼原版 */
.author-content-item.like-music {
  width: 49%;
  min-height: 400px;
  color: var(--anzhiyu-white);
  overflow: hidden;
  border-radius: 24px;
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  position: relative;
  padding: 0;
  transition: all 0.3s ease;
  animation: slide-in 0.6s 0.7s backwards;
  background-size: cover !important;
  background-position: center !important;
}

.author-content-item.like-music:hover {
  transform: translateY(-2px);
  box-shadow: var(--anzhiyu-shadow-blackdeep);
}

.author-content-item.like-music::after {
  -webkit-box-shadow: 0 -69px 203px 11px #453e38 inset;
  box-shadow: 0 -69px 203px 11px #453e38 inset;
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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
  min-height: 400px;
}

.author-content-item-tips {
  opacity: 0.9;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.author-content-item-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
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

.banner-button-group {
  position: absolute;
  bottom: 1.5rem;
  right: 2rem;
}

.banner-button {
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  background: var(--anzhiyu-white-op);
  color: var(--anzhiyu-white);
  display: inline-flex;
  align-items: center;
  z-index: 1;
  transition: .3s;
  cursor: pointer;
  border-bottom: 0 !important;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transform: translateZ(0);
  padding: 8px 12px;
  text-decoration: none;
}

.banner-button:hover {
  background: var(--anzhiyu-info);
  transform: translateY(-2px);
  box-shadow: var(--anzhiyu-shadow-blue);
}

.banner-button i {
  font-size: 14px;
}

.banner-button-text {
  font-size: 14px;
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
  .author-content-item.like-music {
    width: 100% !important;
    min-height: 400px;
  }
  
  .card-content {
    padding: 1rem;
    min-height: 400px;
  }
  
  .author-content-item-title {
    font-size: 36px;
  }
  
  .banner-button {
    padding: 6px 12px;
    font-size: 11px;
  }
  
  .banner-button i,
  .banner-button-text {
    font-size: 11px;
  }
}
</style>