<template>
  <div id="app">
    <!-- 页头 -->
    <AppHeader />

    <!-- 主内容区域 -->
    <div class="page" id="body-wrap">
      <div id="about-page">
        <!-- 头像和基本信息 -->
        <AuthorSection />

        <!-- 自我介绍和追求 -->
        <IntroSection />

        <!-- Hello动画区域 -->
        <!-- <HelloSection /> -->

        <!-- 技能和生涯展示 -->
        <SkillsSection />

        <!-- 数据统计 -->
        <StatisticSection />

        <!-- 性格类型和个人照片 -->
        <div class="author-content">
          <PersonalitiesSection />
          <MyPhotoSection />
        </div>

        <!-- 座右铭和特长 -->
        <div class="author-content">
          <MaximSection />
          <BuffSection />
        </div>

        <!-- 游戏爱好和番剧爱好 -->
        <div class="author-content">
          <GameSection />
          <ComicSection />
        </div>

        <!-- 关注偏好和音乐偏好 -->
        <div class="author-content">
          <TechnologySection />
          <MusicSection />
        </div>

        <!-- 心路历程 -->
        <JourneySection />
      </div>
    </div>

    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import AuthorSection from './AuthorSection.vue'
import IntroSection from './IntroSection.vue'
import HelloSection from './HelloSection.vue'
import SkillsSection from './SkillsSection.vue'
import StatisticSection from './StatisticSection.vue'
import PersonalitiesSection from './PersonalitiesSection.vue'
import MyPhotoSection from './MyPhotoSection.vue'
import MaximSection from './MaximSection.vue'
import BuffSection from './BuffSection.vue'
import GameSection from './GameSection.vue'
import ComicSection from './ComicSection.vue'
import TechnologySection from './TechnologySection.vue'
import MusicSection from './MusicSection.vue'
import JourneySection from './JourneySection.vue'

onMounted(() => {
  console.log('🎉 安知鱼主题个人主页Vue 3版本已加载！')
  console.log('✨ 所有组件已完整适配，与原版HTML效果一致')
})
</script>

<style>
/* 引入全局样式 */
@import '../styles/global.css';

/* 主容器样式 */
.page {
  position: relative;
  z-index: 1;
}

#about-page {
  padding-top: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  z-index: 1;
  margin-top: 60px; /* 为导航栏留出空间 */
}

/* 内容区域样式 */
.author-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  gap: 2%;
}

.author-content .author-content-item {
  border-radius: 24px;
  /* background: var(--anzhiyu-card-bg); */
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  position: relative;
  padding: 1rem 2rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.author-content .author-content-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--anzhiyu-shadow-blackdeep);
}

/* 占位卡片样式 */
.placeholder-card {
  width: 49%;
  border-radius: 24px;
  background: var(--anzhiyu-card-bg);
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  padding: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  transition: all 0.3s ease;
}

.placeholder-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--anzhiyu-shadow-blackdeep);
}

.placeholder-card.full-width {
  width: 100%;
}

.placeholder-card h3 {
  color: var(--anzhiyu-main);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.placeholder-card p {
  color: var(--anzhiyu-secondtext);
  line-height: 1.6;
  margin: 0;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  #about-page {
    padding-left: 15px;
    padding-right: 15px;
  }

  .author-content {
    flex-direction: column;
    gap: 1rem;
  }

  .author-content .author-content-item,
  .placeholder-card {
    width: 100% !important;
    padding: 1rem;
  }
}

/* 确保全局样式生效 */
#app {
  min-height: 100vh;
  /* background: var(--anzhiyu-background); */
  /* color: var(--anzhiyu-fontcolor); */
}

/* 全局字体图标样式（如果需要） */
.anzhiyufont {
  font-family: 'anzhiyufont' !important;
  font-size: inherit;
  font-style: normal;
}
</style>