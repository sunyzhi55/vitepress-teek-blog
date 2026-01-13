<template>
  <div class="author-content-item game-yuanshen"
       style="background:url(https://img02.anheyu.com/adminuploads/1/2022/12/19/63a079ca63c8a.webp) top/cover no-repeat">
    <div class="card-content">
      <div class="author-content-item-tips">爱好游戏</div>
      <span class="author-content-item-title">原神</span>
      <div class="content-bottom">
        <div class="icon-group">
          <div class="loading-bar" role="presentation" aria-hidden="true"></div>
        </div>
        <div class="tips game-yuanshen-uid">UID: 148905547</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 游戏爱好组件，展示原神游戏信息
</script>

<style scoped>
/* 游戏爱好卡片样式 - 严格按照安知鱼原版 */
.author-content-item.game-yuanshen {
  background-size: cover;
  min-height: 300px;
  overflow: hidden;
  color: var(--anzhiyu-white);
  width: 59%;
  border-radius: 24px;
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  position: relative;
  transition: all 0.3s ease;
  animation: slide-in 0.6s 0.6s backwards;
}

.author-content-item.game-yuanshen::after {
  -webkit-box-shadow: 0 -69px 203px 11px #575d8b inset;
  box-shadow: 0 -69px 203px 11px #575d8b inset;
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.author-content-item.game-yuanshen:hover {
  transform: translateY(-2px);
  box-shadow: var(--anzhiyu-shadow-blackdeep);
}

.card-content {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
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
  padding: 1rem 2rem;
  border-radius: 24px;
  color: var(--anzhiyu-white);
  min-height: 300px;
}

.content-bottom {
  margin-top: auto;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}

.icon-group {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  position: relative;
}

.loading-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 62.5px;
  -webkit-transform: translate(-25%, -50%) scale(.5);
  -moz-transform: translate(-25%, -50%) scale(.5);
  -o-transform: translate(-25%, -50%) scale(.5);
  -ms-transform: translate(-25%, -50%) scale(.5);
  transform: translate(-25%, -50%) scale(.5);
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  -ms-transition: all .5s;
  transition: all .5s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
}

.loading-bar::after {
  content: '';
  position: absolute;
  top: 500px;
  left: 0;
  filter: drop-shadow(0 -500px 0 var(--loadingbar-prospect-color));
  width: 500px;
  height: 62.5px;
  background: url(https://yuanshen.site/imgs/loading-bar.png) no-repeat left 100%;
  background-size: 500px 62.5px;
  background-position-x: 0;
}

.author-content-item.game-yuanshen:hover .loading-bar::after {
  -webkit-animation: loading-bar 3.5s cubic-bezier(.28, .11, .32, 1) infinite forwards;
  -moz-animation: loading-bar 3.5s cubic-bezier(.28, .11, .32, 1) infinite forwards;
  -o-animation: loading-bar 3.5s cubic-bezier(.28, .11, .32, 1) infinite forwards;
  -ms-animation: loading-bar 3.5s cubic-bezier(.28, .11, .32, 1) infinite forwards;
  animation: loading-bar 3.5s cubic-bezier(.28, .11, .32, 1) infinite forwards;
}

/* 移动端自动播放loading-bar动画 */
@media screen and (max-width: 768px) {
  .author-content-item.game-yuanshen .content-bottom{
    padding-bottom: 10px;
 }

  .author-content-item.game-yuanshen .loading-bar::after {
    -webkit-animation: loading-bar 3.5s cubic-bezier(.28, .11, .32, 1) infinite forwards;
    -moz-animation: loading-bar 3.5s cubic-bezier(.28, .11, .32, 1) infinite forwards;
    -o-animation: loading-bar 3.5s cubic-bezier(.28, .11, .32, 1) infinite forwards;
    -ms-animation: loading-bar 3.5s cubic-bezier(.28, .11, .32, 1) infinite forwards;
    animation: loading-bar 3.5s cubic-bezier(.28, .11, .32, 1) infinite forwards;
  }
  
  .author-content-item.game-yuanshen .game-yuanshen-uid {
    display: none;
  }
}

/* 原神游戏框专用样式 */
.author-content-item.game-yuanshen .author-content-item-tips {
  opacity: 0.8;
  font-size: 12px;
  margin-bottom: 0.5rem;
  color: var(--anzhiyu-white);
}

.author-content-item.game-yuanshen .author-content-item-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  color: var(--anzhiyu-white);
  margin-bottom: 0.5rem;
}

.tips.game-yuanshen-uid {
  color: var(--anzhiyu-white);
  font-weight: normal;
  font-size: 16px;
}



/* Loading bar动画关键帧 */
@-webkit-keyframes loading-bar {
  0% {
    width: 0;
    background-size: 500px 62.5px;
  }
  83% {
    width: 475px;
  }
  83.1% { width: 475px; }
  83.2% { width: 475px; }
  83.3% { width: 475px; }
  83.4% { width: 475px; }
  83.5% { width: 475px; }
  83.6% { width: 475px; }
  83.7% { width: 475px; }
  83.8% { width: 475px; }
  83.9% { width: 475px; }
  84% { width: 475px; }
  85% { width: 475px; }
  86% { width: 475px; }
  87% { width: 475px; }
  100% {
    width: 500px;
  }
}

@-moz-keyframes loading-bar {
  0% {
    width: 0;
    background-size: 500px 62.5px;
  }
  83% {
    width: 475px;
  }
  83.1% { width: 475px; }
  83.2% { width: 475px; }
  83.3% { width: 475px; }
  83.4% { width: 475px; }
  83.5% { width: 475px; }
  83.6% { width: 475px; }
  83.7% { width: 475px; }
  83.8% { width: 475px; }
  83.9% { width: 475px; }
  84% { width: 475px; }
  85% { width: 475px; }
  86% { width: 475px; }
  87% { width: 475px; }
  100% {
    width: 500px;
  }
}

@-o-keyframes loading-bar {
  0% {
    width: 0;
    background-size: 500px 62.5px;
  }
  83% {
    width: 475px;
  }
  83.1% { width: 475px; }
  83.2% { width: 475px; }
  83.3% { width: 475px; }
  83.4% { width: 475px; }
  83.5% { width: 475px; }
  83.6% { width: 475px; }
  83.7% { width: 475px; }
  83.8% { width: 475px; }
  83.9% { width: 475px; }
  84% { width: 475px; }
  85% { width: 475px; }
  86% { width: 475px; }
  87% { width: 475px; }
  100% {
    width: 500px;
  }
}

@-ms-keyframes loading-bar {
  0% {
    width: 0;
    background-size: 500px 62.5px;
  }
  83% {
    width: 475px;
  }
  83.1% { width: 475px; }
  83.2% { width: 475px; }
  83.3% { width: 475px; }
  83.4% { width: 475px; }
  83.5% { width: 475px; }
  83.6% { width: 475px; }
  83.7% { width: 475px; }
  83.8% { width: 475px; }
  83.9% { width: 475px; }
  84% { width: 475px; }
  85% { width: 475px; }
  86% { width: 475px; }
  87% { width: 475px; }
  100% {
    width: 500px;
  }
}

@keyframes loading-bar {
  0% {
    width: 0;
    background-size: 500px 62.5px;
  }
  83% {
    width: 475px;
  }
  83.1% { width: 475px; }
  83.2% { width: 475px; }
  83.3% { width: 475px; }
  83.4% { width: 475px; }
  83.5% { width: 475px; }
  83.6% { width: 475px; }
  83.7% { width: 475px; }
  83.8% { width: 475px; }
  83.9% { width: 475px; }
  84% { width: 475px; }
  85% { width: 475px; }
  86% { width: 475px; }
  87% { width: 475px; }
  100% {
    width: 500px;
  }
}



/* 响应式设计 */
@media screen and (max-width: 768px) {
  .author-content-item.game-yuanshen {
    width: 100% !important;
    min-height: 300px;
  }
  
  .card-content {
    min-height: 300px;
  }
  
  .author-content-item-title {
    font-size: 24px;
  }
}
</style>