<template>
  <div class="author-content">
    <!-- 数据统计 -->
    <div 
      class="about-statistic author-content-item"
      style="background:url(https://img02.anheyu.com/adminuploads/1/2022/09/23/632d634f8376d.jpg) top/cover no-repeat"
    >
      <div class="card-content">
        <div class="author-content-item-tips">数据</div>
        <span class="author-content-item-title">访问统计</span>
        <div id="statistic">
          <div>
            <span>今日人数</span> 
            <span ref="todayVisitorsRef" data-count="156">0</span>
          </div>
          <div>
            <span>今日访问</span> 
            <span ref="todayViewsRef" data-count="234">0</span>
          </div>
          <div>
            <span>昨日人数</span> 
            <span ref="yesterdayVisitorsRef" data-count="142">0</span>
          </div>
          <div>
            <span>昨日访问</span> 
            <span ref="yesterdayViewsRef" data-count="198">0</span>
          </div>
          <div>
            <span>本月访问</span> 
            <span ref="monthViewsRef" data-count="4521">0</span>
          </div>
          <div>
            <span>总访问量</span> 
            <span ref="totalViewsRef" data-count="28940">0</span>
          </div>
        </div>
        <div class="post-tips">
          统计信息来自 
          <a 
            href="https://invite.51.la/1NzKqTeb?target=V6" 
            target="_blank"
            rel="noopener nofollow"
          >Umami网站统计</a>
        </div>
        <div class="banner-button-group">
          <a class="banner-button" @click.prevent>
            <i class="anzhiyufont anzhiyu-icon-arrow-circle-right"></i> 
            <span class="banner-button-text">文章隧道</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 地图和个人信息 -->
    <div class="author-content-item-group column mapAndInfo">
      <div class="author-content-item map single">
        <span class="map-title">我现在住在<b>{{ personalInfo.location }}</b></span>
      </div>
      <div class="author-content-item selfInfo single">
        <div>
          <span class="selfInfo-title">生于</span> 
          <span class="selfInfo-content" style="color:#43a6c6">{{ personalInfo.birthYear }}</span>
        </div>
        <div>
          <span class="selfInfo-title">{{ personalInfo.school }}</span> 
          <span class="selfInfo-content" style="color:#c69043">{{ personalInfo.major }}</span>
        </div>
        <div>
          <span class="selfInfo-title">现在职业</span> 
          <span class="selfInfo-content" style="color:#b04fe6">{{ personalInfo.currentJob }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePersonalData } from '../data/useData'
import { useCounterAnimation } from '../data/useAnimation'

const { personalInfo } = usePersonalData()
const { observeCounters } = useCounterAnimation()

// DOM引用
const todayVisitorsRef = ref<HTMLElement>()
const todayViewsRef = ref<HTMLElement>()
const yesterdayVisitorsRef = ref<HTMLElement>()
const yesterdayViewsRef = ref<HTMLElement>()
const monthViewsRef = ref<HTMLElement>()
const totalViewsRef = ref<HTMLElement>()

onMounted(() => {
  // 启动数字计数动画
  const cleanup = observeCounters('#statistic span[data-count]')
  
  // 清理函数在组件卸载时执行
  return cleanup
})
</script>

<style scoped>
/* 数据统计和信息区域 */
.author-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.about-statistic {
  width: 39%;
  min-height: 380px;
  color: var(--anzhiyu-white);
}

/* 统计样式 - 严格按照安知鱼官方规范 */
#statistic {
  font-size: 16px;
  border-radius: 15px;
  width: 100%;
  color: var(--anzhiyu-white);
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

#statistic div span:first-child {
  opacity: .8;
  font-size: 12px;
}

#statistic div span:last-child {
  font-weight: 700;
  font-size: 34px;
  line-height: 1;
  white-space: nowrap;
}

#statistic div {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 50%;
  margin-bottom: .5rem;
}

.post-tips {
  font-size: 16px;
  position: absolute;
  bottom: 1rem;
  left: 2rem;
  color: var(--anzhiyu-gray);
}

.post-tips a {
  border: none;
  color: var(--anzhiyu-gray);
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-tips a:hover {
  color: var(--anzhiyu-main) !important;
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

/* 地图和个人信息 */
.author-content-item-group.column {
  width: 59%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.author-content{
    animation: slide-in 0.6s 0.4s backwards;
}

.author-content-item.single {
  width: 100%;
}

.author-content-item.map {
  background-image: url(/map-single.png);
  min-height: 160px;
  max-height: 400px;
  position: relative;
  overflow: hidden;
  height: 60%;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.author-content-item.map:hover {
  background-size: 120%;
  transition: 4s ease-in-out;
  background-position-x: 0;
  background-position-y: 36%;
}

.author-content-item.map:hover .map-title {
  bottom: -100%;
}

.author-content-item.map .map-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: var(--font-color);
  background: var(--anzhiyu-maskbg);
  padding: .5rem 2rem;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transform: translateZ(0);
  transition: all 1s, color 0s ease-in-out;
  font-size: 20px;
}

.author-content-item.map .map-title b {
  color: var(--font-color);
}

/* 深色主题的背景图 */
[data-theme=dark] .author-content-item.map {
  background-image: url(https://img02.anheyu.com/adminuploads/1/2022/09/26/6330ebf1f3e65.jpg);
}

.author-content-item.selfInfo {
  display: flex;
  min-height: 100px;
  max-height: 400px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 40%;
}

.author-content-item.selfInfo div {
  display: flex;
  flex-direction: column;
  margin: .5rem 2rem .5rem 0;
  min-width: 120px;
}

.author-content-item.selfInfo .selfInfo-title {
  opacity: .8;
  font-size: 12px;
  line-height: 1;
  margin-bottom: 8px;
}

.author-content-item.selfInfo .selfInfo-content {
  font-weight: 700;
  font-size: 34px;
  line-height: 1;
}

.author-content-item-tips {
  opacity: 0.8;
  font-size: 12px;
  margin-bottom: 0.5rem;
}

.author-content-item-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.5rem;
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
  .author-content-item-group.column {
    width: 100% !important;
  }
  
  .about-statistic {
    width: 100% !important;
  }
  
  .author-content-item.selfInfo {
    height: 95%;
  }
}
</style>