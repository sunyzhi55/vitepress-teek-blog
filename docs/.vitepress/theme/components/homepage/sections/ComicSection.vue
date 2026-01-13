<template>
  <div class="author-content-item comic-content">
    <div class="card-content">
      <div class="author-content-item-tips">爱好番剧</div>
      <div class="author-content-item-title">追番</div>
      <div class="comic-box">
        <a 
          v-for="anime in animeList" 
          :key="anime.id"
          class="comic-item"
          :href="anime.url"
          rel="external nofollow noreferrer" 
          target="_blank" 
          :title="anime.title"
        >
          <div class="comic-item-cover">
            <img
              :src="anime.cover"
              :data-lazy-src="anime.lazyCover"
              onerror="this.onerror=null,this.src='https://bu.dusays.com/2023/03/03/6401a79030db5.png'"
              :alt="anime.title"
            >
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface AnimeItem {
  id: string
  title: string
  cover: string
  lazyCover: string
  url: string
}

const animeList = ref<AnimeItem[]>([
  {
    id: '1',
    title: '约定的梦幻岛',
    cover: 'https://pixpro.coul.top/i/2025/04/17/817598.webp',
    lazyCover: 'https://img02.anheyu.com/adminuploads/1/2022/12/13/63988658aa1b1.webp',
    url: 'https://www.bilibili.com/bangumi/media/md5267750/?spm_id_from=666.25.b_6d656469615f6d6f64756c65.1'
  },
  {
    id: '2',
    title: '咒术回战',
    cover: 'https://pixpro.coul.top/i/2025/04/17/884369.webp',
    lazyCover: 'https://img02.anheyu.com/adminuploads/1/2022/12/13/6398864e572ed.webp',
    url: 'https://www.bilibili.com/bangumi/media/md28229899/?spm_id_from=666.25.b_6d656469615f6d6f64756c65.1'
  },
  {
    id: '3',
    title: '紫罗兰永恒花园',
    cover: 'https://pixpro.coul.top/i/2025/04/17/868605.webp',
    lazyCover: 'https://img02.anheyu.com/adminuploads/1/2022/12/13/639886315d658.webp',
    url: 'https://www.bilibili.com/bangumi/media/md8892/?spm_id_from=666.25.b_6d656469615f6d6f64756c65.1'
  },
  {
    id: '4',
    title: '鬼灭之刃',
    cover: 'https://pixpro.coul.top/i/2025/04/17/016773.webp',
    lazyCover: 'https://img02.anheyu.com/adminuploads/1/2022/12/13/639886403d472.webp',
    url: 'https://www.bilibili.com/bangumi/media/md22718131/?spm_id_from=666.25.b_6d656469615f6d6f64756c65.1'
  },
  {
    id: '5',
    title: 'JOJO的奇妙冒险 黄金之风',
    cover: 'https://pixpro.coul.top/i/2025/04/17/375755.webp',
    lazyCover: 'https://img02.anheyu.com/adminuploads/1/2022/12/13/6398862649585.webp',
    url: 'https://www.bilibili.com/bangumi/media/md135652/?spm_id_from=666.25.b_6d656469615f6d6f64756c65.1'
  }
])
</script>

<style scoped>
/* 番剧爱好卡片样式 - 严格按照安知鱼原版 */
.author-content-item.comic-content {
  width: 39%;
  min-height: 300px;
  overflow: hidden;
  border-radius: 24px;
  background: var(--anzhiyu-card-bg);
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  position: relative;
  transition: all 0.3s ease;
  animation: slide-in 0.6s 0.6s backwards;
}

.author-content-item.comic-content::after {
  -webkit-box-shadow: 0 -48px 203px 11px #fbe9b8 inset;
  box-shadow: 0 -48px 203px 11px #fbe9b8 inset;
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.author-content-item.comic-content:hover {
  transform: translateY(-2px);
  box-shadow: var(--anzhiyu-shadow-blackdeep);
}

.card-content {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    flex-direction: column;
    padding: 1rem 2rem;
}

.author-content-item-tips,
.author-content-item-title {
  z-index: 2;
  color: var(--anzhiyu-white);
  pointer-events: none;
  position: relative;
}

.author-content-item-tips {
  opacity: 0.8;
  font-size: 12px;
  margin-bottom: 0.5rem;
}

.author-content-item-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 1rem;
}

.comic-box {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  width: 120%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 0;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}

.comic-item {
  height: 100%;
  color: #fff;
  width: 20%;
  -webkit-transform: skew(-10deg, 0deg);
  -moz-transform: skew(-10deg, 0deg);
  -o-transform: skew(-10deg, 0deg);
  -ms-transform: skew(-10deg, 0deg);
  transform: skew(-10deg, 0deg);
  -webkit-transition: .8s;
  -moz-transition: .8s;
  -o-transition: .8s;
  -ms-transition: .8s;
  transition: .8s;
  position: relative;
  overflow: hidden;
  display: block;
  text-decoration: none;
}

.comic-item:hover {
  width: 46%;
}

.comic-item:hover .comic-item-cover {
  left: 16%;
  -webkit-transform: skew(10deg, 0deg) scale(1.6);
  -moz-transform: skew(10deg, 0deg) scale(1.6);
  -o-transform: skew(10deg, 0deg) scale(1.6);
  -ms-transform: skew(10deg, 0deg) scale(1.6);
  transform: skew(10deg, 0deg) scale(1.6);
}

.comic-item-cover {
  position: absolute;
  top: 0;
  left: -50%;
  height: 100%;
  -webkit-transform: skew(10deg, 0deg);
  -moz-transform: skew(10deg, 0deg);
  -o-transform: skew(10deg, 0deg);
  -ms-transform: skew(10deg, 0deg);
  transform: skew(10deg, 0deg);
  object-fit: cover;
  -webkit-transition: scale .2s, all .8s;
  -moz-transition: scale .2s, all .8s;
  -o-transition: scale .2s, all .8s;
  -ms-transition: scale .2s, all .8s;
  transition: scale .2s, all .8s;
}

.comic-item-cover img {
  height: 100%;
  -webkit-transition: .8s;
  -moz-transition: .8s;
  -o-transition: .8s;
  -ms-transition: .8s;
  transition: .8s;
  max-width: none;
  border-radius: 0;
  object-fit: cover;
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

</style>