<template>
  <header class="page-header not-top-img" id="page-header">
    <nav id="nav">
      <div id="nav-group">
        <!-- 网站名称 -->
        <span id="blog_name">
          <a id="site-name" href="/" accesskey="h" @click.prevent>
            <div class="title">Hyde</div>
            <i class="anzhiyufont anzhiyu-icon-house-chimney"></i>
          </a>
        </span>

        <!-- 页面名称容器 -->
        <div class="mask-name-container">
          <div id="name-container">
            <a id="page-name" href="javascript:void(0)" @click.prevent>个人主页</a>
          </div>
        </div>

        <!-- 导航菜单 -->
        <div id="menus">
          <div class="menus_items">
            <div 
              v-for="item in menuItems" 
              :key="item.id"
              class="menus_item"
            >
              <a 
                class="site-page" 
                href="javascript:void(0);" 
                @click.prevent
              >
                <span>{{ item.title }}</span>
              </a>
              <ul v-if="item.children" class="menus_item_child">
                <li v-for="child in item.children" :key="child.id">
                  <a 
                    class="site-page child faa-parent animated-hover" 
                    :href="child.url"
                    @click.prevent
                  >
                    <i 
                      v-if="child.icon"
                      :class="`anzhiyufont ${child.icon} faa-tada`" 
                      style="font-size:.9em"
                    ></i> 
                    <span>{{ child.title }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 右侧导航 -->
        <div id="nav-right">
          <!-- 这里可以添加其他导航按钮 -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useMenuData } from '../data/useData'

const { menuItems } = useMenuData()
</script>

<style scoped>
/* 导航栏样式 - 严格按照安知鱼官方规范 */
.page-header {
  position: relative;
  width: 100%;
  transition: all .5s ease 0s;
}

.page-header.not-top-img {
  margin-bottom: 10px;
  height: 60px;
  background: 0;
}

#nav {
  position: fixed;
  transition: .3s;
  top: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  padding: 0 calc((100% - 1400px + 3rem)/ 2);
  width: 100%;
  height: 64px;
  opacity: 1;
  justify-content: space-between;
  outline: 1px solid var(--anzhiyu-none);
  background: var(--anzhiyu-card-bg);
  outline: 1px solid var(--anzhiyu-card-border);
  transform: translateZ(0);
}

#nav #menus {
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  height: 60px;
  left: 0;
  margin: 0;
  padding: 0 calc((100% - 1400px + 3rem) / 2);
}

#nav i {
  font-size: 1.2rem;
  font-weight: 700;
}

#nav-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

#blog_name {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 60px;
  transition: .3s;
  z-index: 102;
}

#site-name {
  font-weight: 700;
  cursor: pointer;
  transition: .3s !important;
  color: var(--anzhiyu-fontcolor);
  text-decoration: none;
  display: flex;
  align-items: center;
  border-radius: 50px;
  padding: 0 2px;
  height: 35px;
  line-height: 35px;
  position: relative;
}

#site-name .title {
  letter-spacing: normal;
  font-size: 1.2rem;
  padding: 0 5px;
  line-height: 2rem;
  transition: color 0s;
}

#site-name:hover {
  color: var(--anzhiyu-white);
  background: var(--anzhiyu-main);
  box-shadow: var(--anzhiyu-shadow-main);
}

.mask-name-container {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  left: 0;
}

#name-container {
  align-items: center;
  display: flex;
  border-radius: 12px;
  height: 40px;
  position: absolute;
  top: 62px;
  left: 0;
  right: 0;
  margin: auto;
  justify-content: center;
}

#page-name {
  color: var(--anzhiyu-fontcolor);
  font-weight: 600;
  text-decoration: none;
}

#menus {
  display: flex;
  align-items: center;
}

#menus .menus_items {
  display: flex;
  position: relative;
  width: fit-content;
  justify-content: center;
  text-align: center;
  left: 0;
  right: 0;
  top: 0;
  flex-direction: row;
}

#menus .menus_item {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin: auto;
  border-radius: 30px;
  padding: 0 .4rem;
}

#menus .menus_item > a {
  letter-spacing: .3rem;
  font-weight: 700;
  color: var(--anzhiyu-fontcolor);
  text-decoration: none;
  padding: 0 .8em 0 1em;
  border-radius: 50px;
  transition: color 0s !important;
  height: 35px;
  line-height: 35px;
}

#menus .menus_item:hover > a {
  color: var(--anzhiyu-white);
  background: var(--anzhiyu-main);
}

#menus .menus_item_child {
  position: absolute;
  top: 35px;
  opacity: 0;
  width: max-content;
  border: 1px solid var(--anzhiyu-card-border);
  box-shadow: var(--anzhiyu-shadow-black);
  transition: .2s;
  background-color: var(--anzhiyu-card-bg);
  border-radius: 50px;
  right: auto;
  left: auto;
  padding: 6px 4px;
  line-height: 35px;
  transform: translateY(-10px) scale(0);
  transform: translateY(10px);
  transform-origin: top;
  pointer-events: none;
  margin-top: 8px;
}

#menus .menus_item:hover .menus_item_child {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}

#menus .menus_item_child li {
  transition: all .3s;
  display: inline-block;
  margin: 0 3px;
  border-radius: 50px;
  list-style: none;
}

#menus .menus_item_child li a span {
  font-weight: 700;
}

#menus .menus_item_child .child {
  color: var(--anzhiyu-fontcolor);
  text-decoration: none;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  transition: .3s;
}

#menus .menus_item_child .child:hover {
  color: var(--anzhiyu-main);
  background: var(--anzhiyu-card-bg-op);
}

#menus .menus_item_child .child i {
  margin-right: 8px;
  font-size: 0.9rem;
}

#nav-right {
  display: flex;
  align-items: center;
}

/* 移动端响应式 */
@media screen and (max-width: 768px) {
  #nav {
    padding: 0 16px;
  }
  
  #menus .menus_item > a {
    font-size: 0.9rem;
    padding: 0 .5em;
  }
}
</style>