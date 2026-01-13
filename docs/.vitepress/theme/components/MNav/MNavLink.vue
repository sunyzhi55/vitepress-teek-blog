<script setup lang="ts">
import { computed, watch, shallowRef } from "vue";
import { withBase } from "vitepress";
import { slugify } from "@mdit-vue/shared";
import { NavLink } from './untils/types'
import { TkIcon } from "vitepress-theme-teek";
import { NoIcon } from "../../icon/NavIcon";

const props = defineProps<{
  noIcon?: boolean;
  icon?: NavLink["icon"];
  badge?: NavLink["badge"];
  title?: NavLink["title"];
  desc?: NavLink["desc"];
  link: NavLink["link"];
}>();

// 使用 shallowRef 优化响应式性能
const imgError = shallowRef(false);

// 优化 watch，添加 flush: 'post' 避免不必要的重复执行
watch(() => props.icon, () => {
  imgError.value = false;
}, { flush: 'post' });

// 缓存计算结果，避免重复计算
const showImg = computed(() => {
  return typeof props.icon === "string" && props.icon && !imgError.value;
});

const imgSrc = computed(() => {
  if (typeof props.icon === "string") {
    return withBase(props.icon);
  }
  return '';
});

// 优化：只在有title时才计算slugify，避免不必要的计算
const formatTitle = computed(() => {
  return props.title ? slugify(props.title) : "";
});

// 安全的SVG处理：添加基本的XSS防护
const safeSvg = computed(() => {
  if (typeof props.icon === "object" && props.icon && 'svg' in props.icon) {
    const svg = props.icon.svg;
    // 基本的XSS防护：移除潜在危险的标签和属性
    if (typeof svg === 'string') {
      return svg
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/on\w+="[^"]*"/gi, '')
        .replace(/javascript:/gi, '');
    }
    return svg;
  }
  return "";
});

const formatBadge = computed(() => {
  if (typeof props.badge === "string") {
    return { text: props.badge, type: "info" as const };
  }
  return props.badge;
});

// 图片加载错误处理
const handleImageError = () => {
  imgError.value = true;
};
</script>

<template>
  <a v-if="link" class="m-nav-link" :href="link" target="_blank" rel="noreferrer">
    <article class="box" :class="{ 'has-badge': formatBadge }">
      <div class="box-header">
        <template v-if="!noIcon">
          <!-- 安全的SVG渲染 -->
          <div v-if="safeSvg" class="icon" v-html="safeSvg"></div>
          <div v-else-if="showImg" class="icon">
            <img :src="imgSrc" :alt="title || '图标'" @error="handleImageError" loading="lazy" decoding="async" />
          </div>
          <TkIcon v-else class="icon" :icon="NoIcon"></TkIcon>
        </template>
        <div class="content">
          <h5 v-if="title" :id="formatTitle" class="title" :class="{ 'no-icon': noIcon }">
            {{ title }}
          </h5>
          <p v-if="desc" class="desc">{{ desc }}</p>
        </div>
      </div>
      <Badge v-if="formatBadge" class="badge" :type="formatBadge.type" :text="formatBadge.text" />
    </article>
  </a>
</template>

<style scoped>
.m-nav-link {
  --m-nav-icon-box-size: 60px;
  --m-nav-icon-size: 60px;
  --m-nav-box-gap: 8px;
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  /* 优化：背景色无过渡，立即响应，其他属性保持平滑过渡 */
  transition: transform 0.25s ease-out, border-color 0.25s ease-out, box-shadow 0.25s ease-out;
  /* 优化：启用硬件加速 */
  will-change: transform;
}

/* 优化：修复hover背景延迟问题，使用回退值 */
.m-nav-link:hover {
  box-shadow: var(--vp-shadow-2);
  border-color: var(--vp-c-brand);
  text-decoration: initial;
  background-color: var(--vp-c-brand-1);
  transform: translateY(-5px);
}

.m-nav-link:hover .icon {
  transform: translateX(-50%) scale(0);
  opacity: 0;
}

.m-nav-link:hover .content {
  margin-left: calc(-5 * var(--m-nav-box-gap));
}

.m-nav-link:hover .title,
.m-nav-link:hover .desc {
  color: white;
}

.m-nav-link .box {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 18px 2px;
  height: 100%;
  color: var(--vp-c-text-1);
}

.m-nav-link .box .has-badge {
  padding-top: calc(var(--m-nav-box-gap) + 2px);
}

.m-nav-link .box-header {
  display: flex;
  align-items: center;
  flex: 1;
}

.m-nav-link .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  min-width: var(--m-nav-icon-box-size);
  min-height: var(--m-nav-icon-box-size);
  width: var(--m-nav-icon-box-size);
  height: var(--m-nav-icon-box-size);
  font-size: var(--m-nav-icon-size);
  background-color: var(--vp-c-bg-soft-down);
  /* 优化：分离动画属性，提升性能 */
  transition: transform 0.6s ease-in-out, opacity 0.4s ease-in-out;
  flex-shrink: 0;
  transform: translateX(0) scale(1);
  opacity: 1;
  /* 优化：启用硬件加速 */
  will-change: transform, opacity;
}

.m-nav-link .icon svg {
  width: var(--m-nav-icon-size);
  fill: currentColor;
}

.m-nav-link .icon img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
  /* 优化：图片渲染优化 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.m-nav-link .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-height: var(--m-nav-icon-box-size);
  height: 100%;
  overflow: hidden;
  margin-left: 0;
  transition: margin-left 0.3s ease-in-out;
  /* 优化：启用硬件加速 */
  will-change: margin-left;
}

.m-nav-link .title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  width: 100%;
  flex-shrink: 0;
  /* 优化：文本渲染优化 */
  text-rendering: optimizeLegibility;
}

.m-nav-link .desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 4px 0 0;
  line-height: 1.5;
  font-size: 12px;
  color: var(--vp-c-text-2);
  width: 100%;
  word-wrap: break-word;
  flex: 1;
  min-height: 0;
  /* 优化：文本渲染优化 */
  text-rendering: optimizeLegibility;
}

.m-nav-link .badge {
  position: absolute;
  top: 2px;
  right: 0;
  transform: scale(0.8);
}

/* 优化：减少重绘，使用 contain 属性 */
.m-nav-link {
  contain: layout style paint;
}

/* 优化：预加载关键资源 */
.m-nav-link .icon {
  contain: layout style;
}

/* 优化：使用 container queries 替代媒体查询（如果支持） */
@media (max-width: 960px) {
  .m-nav-link {
    --m-nav-icon-box-size: 50px;
    --m-nav-icon-size: 36px;
    --m-nav-box-gap: 15px;
  }

  .m-nav-link .box {
    padding: 12px 0;
  }

  .m-nav-link .icon img {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    object-fit: cover;
  }

  .m-nav-link .title {
    font-size: 14px;
  }

  .m-nav-link .desc {
    font-size: 12px;
  }

  .m-nav-link:hover .content {
    margin-left: calc(-3 * var(--m-nav-box-gap));
    /* 移动端导航链接鼠标悬停时，内容左边距 */
  }
}
</style>