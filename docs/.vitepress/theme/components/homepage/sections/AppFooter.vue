<template>
  <footer id="footer">
    <div id="footer-wrap">
      <!-- 主要页脚内容 -->
      <div id="anzhiyu-footer">
        <div class="footer-group">
          <div class="footer-title">技术</div>
          <div class="footer-links">
            <a class="footer-item" title="前端开发" href="#" @click.prevent>前端开发</a>
            <a class="footer-item" title="后端开发" href="#" @click.prevent>后端开发</a>
            <a class="footer-item" title="设计开发" href="#" @click.prevent>设计开发</a>
          </div>
        </div>
        
        <div class="footer-group">
          <div class="footer-title">导航</div>
          <div class="footer-links">
            <a class="footer-item" title="关于我" href="#" @click.prevent>关于我</a>
            <a class="footer-item" title="联系方式" href="#" @click.prevent>联系方式</a>
            <a class="footer-item" title="个人作品" href="#" @click.prevent>个人作品</a>
          </div>
        </div>
        
        <div class="footer-group">
          <div class="footer-title">协议</div>
          <div class="footer-links">
            <a class="footer-item" title="隐私协议" href="#" @click.prevent>隐私协议</a>
            <a class="footer-item" title="版权协议" href="#" @click.prevent>版权协议</a>
          </div>
        </div>
      </div>

      <!-- 徽章 -->
      <p id="ghbdages">
        <a 
          class="github-badge" 
          target="_blank" 
          href="#" 
          @click.prevent
          style="margin-inline:5px" 
          data-title="本站使用安知鱼主题" 
          title="本站使用安知鱼主题"
        >
          <img 
            src="https://img.shields.io/badge/zsr-Ubuntu-E95420?logo=ubuntu&label=Server" 
            alt="本站使用安知鱼主题"
          >
        </a>
        <a 
          class="github-badge" 
          target="_blank" 
          href="#" 
          @click.prevent
          style="margin-inline:5px" 
          data-title="本站使用安知鱼主题" 
          title="本站使用安知鱼主题"
        >
          <img 
            src="https://img.shields.io/badge/zsr-Vue-4FC08D?logo=Vue.js&label=Frame" 
            alt="本站使用安知鱼主题"
          >
        </a>
        <a 
          class="github-badge" 
          target="_blank" 
          href="#" 
          @click.prevent
          style="margin-inline:5px" 
          data-title="本站使用安知鱼主题" 
          title="本站使用安知鱼主题"
        >
          <img 
            src="https://img.shields.io/badge/zsr-Vite-blue?logo=vite&label=Build" 
            alt="本站使用安知鱼主题"
          >
        </a>
        <a 
          class="github-badge" 
          target="_blank" 
          href="#" 
          @click.prevent
          style="margin-inline:5px" 
          data-title="本站使用安知鱼主题" 
          title="本站使用安知鱼主题"
        >
          <img 
            src="https://img.shields.io/badge/zsr-EdgeOne-blue?logo=icloud&label=CDN" 
            alt="本站使用安知鱼主题"
          >
        </a>
        <a 
          class="github-badge" 
          target="_blank" 
          href="#" 
          @click.prevent
          style="margin-inline:5px" 
          data-title="本站使用安知鱼主题" 
          title="本站使用安知鱼主题"
        >
          <img 
            src="https://img.shields.io/badge/zsr-Github-181717?logo=github&label=Source" 
            alt="本站使用安知鱼主题"
          >
        </a>
      </p>
    </div>

    <!-- 底部栏 -->
    <div id="footer-bar">
      <div class="footer-bar-links">
        <div class="footer-bar-left">
          <div id="footer-bar-tips">
            <div class="copyright">
              &copy;2025 By 
              <a class="footer-bar-link" href="#" title="Hyde" target="_blank" @click.prevent>Hyde</a>
            </div>
          </div>
        </div>
        <div class="footer-bar-right">
          <a 
            class="footer-bar-link" 
            target="_blank" 
            href="#" 
            title="主题" 
            @click.prevent
          >主题</a>
          <a 
            class="footer-bar-link" 
            target="_blank" 
            href="#" 
            title="项目"
            @click.prevent
          >项目</a>
          <a 
            class="footer-bar-link" 
            target="_blank" 
            href="https://beian.miit.gov.cn/" 
            title="冀ICP备2025110107号-1"
          >冀ICP备2025110107号-1</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 这里不需要额外的逻辑
</script>

<style scoped>
/* 页脚样式 - 严格按照安知鱼官方规范 */
#footer {
  position: relative;
  background: linear-gradient(180deg, var(--anzhiyu-card-bg-none) 0, var(--anzhiyu-card-bg) 25%);
  background-attachment: scroll;
  background-position: bottom;
  background-size: cover;
  margin-top: 60px;
}

#footer-wrap {
  position: relative;
  padding: 40px 20px 0;
  color: var(--anzhiyu-secondtext);
}

#anzhiyu-footer {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  margin: 1rem auto;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 2rem;
}

.footer-group {
  min-width: 120px;
}

.footer-title {
  color: var(--anzhiyu-secondtext);
  font-size: 1rem;
  text-align: left;
  font-weight: 600;
  margin: 1rem 0;
}

.footer-links {
  display: flex;
  flex-direction: column;
}

.footer-item {
  font-size: 1rem;
  line-height: 1rem;
  margin: 8px 0;
  color: var(--anzhiyu-fontcolor);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 120px;
  cursor: pointer;
  padding: 2px 0;
  text-decoration: none;
  transition: .3s;
}

.footer-item:hover {
  color: var(--anzhiyu-main);
}

#ghbdages {
  margin: 20px 0;
  text-align: center;
}

.github-badge {
  display: inline-block;
  margin: 4px;
  text-decoration: none;
}

.github-badge img {
  height: 20px;
  border-radius: 4px;
}

#footer-bar {
  padding: 1rem;
  color: var(--anzhiyu-fontcolor);
  margin-top: 1rem;
  /* background: var(--anzhiyu-secondbg); */
  display: flex;
  overflow: hidden;
  z-index: 1002;
  transition: .3s;
}

#footer-bar a:hover {
  color: var(--anzhiyu-lighttext);
}

.footer-bar-link {
  margin: 8px 1rem 8px 0;
  color: var(--anzhiyu-fontcolor);
  font-size: 1rem;
  font-weight: 700;
  white-space: nowrap;
  text-decoration: none;
  transition: .3s;
}

.footer-bar-link:hover {
  color: var(--anzhiyu-main);
}

.footer-bar-links {
  display: flex;
  justify-content: space-between;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  flex-wrap: wrap;
  align-items: center;
  line-height: 1;
}

.footer-bar-left {
  display: flex;
  flex-wrap: wrap;
  min-height: 32px;
  align-items: center;
}

.footer-bar-right {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.copyright {
  color: var(--anzhiyu-fontcolor);
  font-size: 0.9rem;
}

/* 移动端响应式 */
@media screen and (max-width: 768px) {
  #footer {
    z-index: 3;
    margin-top: -1px;
  }

  #footer-wrap {
    padding: 20px 16px 0;
  }

  #anzhiyu-footer {
    flex-direction: row;
    padding: 0 1rem;
  }

  .footer-title {
    text-align: left;
  }

  .footer-bar-links {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .footer-bar-left {
    justify-content: center;
    margin-bottom: 10px;
  }

  .footer-bar-right {
    justify-content: center;
  }
}
</style>