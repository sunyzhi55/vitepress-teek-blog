<template>
  <div class="author-content">
    <div class="skills-careers-container">
      <!-- 技能展示 -->
      <div class="author-content-item skills">
        <div class="card-content">
          <div class="author-content-item-tips">技能</div>
          <span class="author-content-item-title">开启创造力</span>
          <div class="skills-style-group">
            <!-- 滚动技能图标 -->
            <div id="skills-tags-group-all">
              <div class="tags-group-wrapper">
                <div 
                  v-for="(pair, index) in skillPairs" 
                  :key="index"
                  class="tags-group-icon-pair"
                >
                  <div 
                    v-for="skill in pair" 
                    :key="skill.id"
                    class="tags-group-icon" 
                    :style="{ background: skill.background }"
                    :title="skill.title"
                  >
                    <img 
                      class="no-lightbox" 
                      :src="skill.image" 
                      :alt="skill.title"
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- 技能列表（悬停时显示） -->
            <div class="skills-list">
              <div 
                v-for="skill in skillIcons.slice(0, 16)" 
                :key="skill.id"
                class="skill-info"
              >
                <div 
                  class="skill-icon" 
                  :style="{ background: skill.background }"
                >
                  <img 
                    class="no-lightbox" 
                    :src="skill.image" 
                    size="60px" 
                    :alt="skill.title"
                  >
                </div>
                <div class="skill-name">
                  <span>{{ skill.title }}</span>
                </div>
              </div>
              <div class="etc">...</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 生涯经历 -->
      <div class="author-content-item careers">
        <div class="card-content">
          <div class="author-content-item-tips">生涯</div>
          <span class="author-content-item-title">无限进步</span>
          <div class="careers-group">
            <div 
              v-for="career in careers" 
              :key="career.id"
              class="careers-item"
            >
              <div 
                class="circle" 
                :style="{ background: career.color }"
              ></div>
              <div class="name">{{ career.name }}</div>
            </div>
          </div>
          <img 
            class="author-content-img no-lightbox" 
            alt="生涯" 
            src="https://img20.360buyimg.com/openfeedback/jfs/t1/309458/35/18671/4170/687f1093Fd2b00cf5/dcefafcc0ab2dc3d.webp"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSkillsData, useCareersData } from '../data/useData'
import { useHoverEffects } from '../data/useAnimation'

const { skillIcons } = useSkillsData()
const { careers } = useCareersData()
const { setupCardHover } = useHoverEffects()

// 将技能图标分组为pairs
const skillPairs = computed(() => {
  const pairs = []
  const doubleSkills = [...skillIcons.value, ...skillIcons.value] // 复制一份用于无限滚动
  
  for (let i = 0; i < doubleSkills.length; i += 2) {
    pairs.push(doubleSkills.slice(i, i + 2))
  }
  return pairs
})

onMounted(() => {
  // 设置卡片悬停效果
  setupCardHover('.author-content-item')
})
</script>

<style scoped>
/* 技能和生涯区域 - 严格按照安知鱼原版 */
.skills-careers-container {
  width: 100%;
  display: flex;
  gap: 2%;
  align-items: stretch;
  animation: slide-in 0.6s 0.5s backwards;
}

.author-content-item.skills {
  width: 49%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  min-height: 450px;
}

.author-content-item.careers {
  width: 49%;
  min-height: 400px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: bottom;
}

/* 技能展示区域 */
.skills .card-content {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
}

.skills .author-content-item-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.skills-style-group {
  position: relative;
  overflow: hidden;
}

#skills-tags-group-all {
  display: flex;
  transform: rotate(0);
  transition: .3s;
  overflow: hidden;
  margin-top: 10px;
}

#skills-tags-group-all .tags-group-wrapper {
  margin-top: 40px;
  display: flex;
  flex-wrap: nowrap;
  animation: rowup 25s linear infinite;
}

#skills-tags-group-all .tags-group-icon-pair {
  margin-left: 1rem;
}

#skills-tags-group-all .tags-group-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 66px;
  font-weight: 700;
  box-shadow: var(--anzhiyu-shadow-blackdeep);
  width: 120px;
  height: 120px;
  border-radius: 30px;
  transition: all 0.3s ease;
  cursor: pointer;
}

#skills-tags-group-all .tags-group-icon img {
  width: 60px;
  margin: 0 auto !important;
}

#skills-tags-group-all .tags-group-icon-pair .tags-group-icon:nth-child(even) {
  margin-top: 1rem;
  transform: translate(-60px);
}

.skills-list {
  display: flex;
  opacity: 0;
  transition: .3s;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 10px;
}

.skills .skill-info {
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-top: 10px;
  background: var(--anzhiyu-background);
  border-radius: 40px;
  padding: 4px 12px 4px 8px;
  border: var(--style-border);
  box-shadow: var(--anzhiyu-shadow-border);
}

.skills .skill-icon {
  width: 32px;
  height: 32px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.skills .skill-icon img {
  width: 18px;
  height: 18px;
  margin: 0 auto !important;
}

.author-content-item.skills:hover .skills-style-group #skills-tags-group-all {
  opacity: 0;
}

.author-content-item.skills:hover .skills-style-group .skills-list {
  opacity: 1;
}

/* 生涯经历区域 */
.careers .card-content {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
}

.careers .author-content-item-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.careers-group {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 12px;
  margin-bottom: 12px;
}

.careers-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}

.careers-item .circle {
  width: 16px;
  height: 16px;
  margin-top: 3px;
  margin-right: 8px;
  border-radius: 50%;
}

.careers-item .name {
  color: var(--anzhiyu-secondtext);
  font-size: var(--global-font-size);
}

.careers img {
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 100%;
  transition: 0.6s;
}

.etc {
  text-align: center;
  color: var(--anzhiyu-gray);
  font-size: 1.5rem;
  grid-column: 1 / -1;
  margin-top: 10px;
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

/* 无限滚动动画 */
@keyframes rowup {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
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
  .skills-careers-container {
    flex-direction: column;
  }
  
  .author-content-item.skills,
  .author-content-item.careers {
    width: 100%;
  }

  .author-content-item.careers {
    margin-top: 1rem;
  }
}
</style>