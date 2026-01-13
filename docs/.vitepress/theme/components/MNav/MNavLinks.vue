<script setup lang="ts">
import { computed, shallowRef, onUnmounted } from 'vue'
import { slugify } from '@mdit-vue/shared'
// @ts-ignore
import MNavLink from './MNavLink.vue'
import type { NavLink } from './untils/types'

const props = defineProps<{
  title: string
  noIcon?: boolean
  items: NavLink[]
}>()

// 优化：缓存 slugify 结果，避免重复计算
const formatTitle = computed(() => {
  return props.title ? slugify(props.title) : ''
})

// 优化：为每个 item 生成唯一的 key，避免重复 key 问题
const itemsWithKeys = computed(() => {
  return props.items.map((item, index) => ({
    ...item,
    uniqueKey: item.link || `item-${index}`
  }))
})

// 优化：预计算网格列数，减少 CSS 重新计算
const gridColumns = shallowRef('repeat(auto-fill, minmax(167px, 1fr))')

// 响应式网格列数计算
const updateGridColumns = () => {
  const width = window.innerWidth
  if (width >= 1440) {
    gridColumns.value = 'repeat(auto-fill, minmax(240px, 1fr))'
  } else if (width >= 960) {
    gridColumns.value = 'repeat(auto-fill, minmax(200px, 1fr))'
  } else if (width >= 768) {
    gridColumns.value = 'repeat(auto-fill, minmax(175px, 1fr))'
  } else if (width >= 640) {
    gridColumns.value = 'repeat(auto-fill, minmax(155px, 1fr))'
  } else if (width >= 500) {
    gridColumns.value = 'repeat(auto-fill, minmax(140px, 1fr))'
  } else {
    gridColumns.value = 'repeat(auto-fill, minmax(167px, 1fr))'
  }
}

// 修复：使用正确的类型定义，兼容浏览器和 Node.js 环境
let resizeTimer: ReturnType<typeof setTimeout> | null = null
const handleResize = () => {
  if (resizeTimer) {
    clearTimeout(resizeTimer)
  }
  resizeTimer = setTimeout(updateGridColumns, 150)
}

// 组件挂载时初始化
if (typeof window !== 'undefined') {
  updateGridColumns()
  window.addEventListener('resize', handleResize, { passive: true })
}

// 组件卸载时清理
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
  if (resizeTimer) {
    clearTimeout(resizeTimer)
  }
})
</script>

<template>
  <section class="m-nav-section" role="region" :aria-labelledby="formatTitle">
    <h2 
      v-if="title" 
      :id="formatTitle" 
      class="nav-title"
      tabindex="-1"
      role="heading"
      aria-level="2"
    >
      {{ title }}
      <a 
        class="header-anchor" 
        :href="`#${formatTitle}`" 
        :aria-label="`链接到 ${title} 部分`"
        role="link"
      >
      </a>
    </h2>
    <div 
      class="m-nav-links" 
      role="list"
      :style="{ '--grid-columns': gridColumns }"
    >
      <MNavLink 
        v-for="item in itemsWithKeys" 
        :key="item.uniqueKey"
        :noIcon="noIcon" 
        v-bind="item"
        role="listitem"
      />
    </div>
  </section>
</template>

<style scoped>
.m-nav-links {
  --m-nav-gap: 10px;
  /* 设置导航链接的间距 */
  display: grid;
  /* 设置导航链接的布局为网格布局 */
  grid-template-columns: repeat(auto-fill, minmax(167px, 1fr));
  /* 设置网格的列数为自动填充，最小宽度为135px，最大宽度为1fr */
  grid-row-gap: var(--m-nav-gap);
  /* 设置网格的行间距为--m-nav-gap */
  grid-column-gap: var(--m-nav-gap);
  /* 设置网格的列间距为--m-nav-gap */
  grid-auto-flow: row dense;
  /* 设置网格的自动填充方式为行密集 */
  justify-content: center;
  /* 设置网格的居中对齐方式 */
  margin-top: var(--m-nav-gap);
  /* 设置导航链接的上边距为--m-nav-gap */
}

@media (min-width: 500px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}

@media (min-width: 640px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
  }
}

@media (min-width: 768px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  }
}

@media (min-width: 960px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (min-width: 1440px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (min-width: 960px) {
  .m-nav-links {
    --m-nav-gap: 10px;
  }
}

</style>