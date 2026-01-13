<template>
  <div class="link-item-card">
    <a :href="data.link" :title="data.name" target="_blank" rel="noopener">
      <!-- 头像 -->
      <div class="link-avatar">
        <img
          v-if="!imageFailed && data.avatar"
          :src="data.avatar"
          :alt="data.name"
          @error="handleImageError"
          :class="{ irregular: data.irregular }"
        />
        <span v-else class="avatar-placeholder">
          {{ data.name ? data.name.charAt(0).toUpperCase() : "?" }}
        </span>
      </div>

      <!-- 信息 -->
      <div class="link-content">
        <div class="link-name">{{ data.name }}</div>
        <div class="link-desc" :title="data.descr">
          {{ data.descr }}
        </div>
      </div>

      <!-- Badge 标签 - 右上角定位 -->
      <span
        v-if="data.badge && data.badge.trim()"
        class="link-badge"
        :class="getBadgeClass(data.badgeType)"
      >
        {{ data.badge }}
      </span>
    </a>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});

import { ref } from "vue";
const imageFailed = ref(false);

const handleImageError = () => {
  imageFailed.value = true;
};

// Badge 类型映射
const getBadgeClass = (badgeType) => {
  const typeMap = {
    tip: "badge-tip",
    warning: "badge-warning",
    danger: "badge-danger",
    info: "badge-info",
    success: "badge-success",
  };
  return typeMap[badgeType] || "badge-default";
};
</script>

<style scoped>
.link-item-card {
  position: relative;
  height: 100px;
  border-radius: 12px;
  background: var(--vp-c-bg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  overflow: hidden;
}

.link-item-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.link-item-card a {
  display: flex;
  align-items: center;
  height: 100%;
  text-decoration: none;
  color: inherit;
  gap: 16px;
}

.link-avatar {
  flex: 0 0 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center center;
  transition: transform 0.5s ease, flex-basis 0.5s ease, width 0.5s ease,
    opacity 0.5s ease;
}

.link-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.link-avatar img.irregular {
  border-radius: 8px;
  object-fit: contain;
}

.link-avatar .avatar-placeholder {
  width: 60px;
  height: 60px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #555;
  font-size: 1.2rem;
  transition: transform 0.25s ease-out, border-color 0.25s ease-out,
    box-shadow 0.25s ease-out;
}

.link-item-card:hover .link-avatar img,
.link-item-card:hover .avatar-placeholder {
  transform: scale(0);
}

/* 当鼠标悬停时整体以中心点缩小头像容器并收起布局，使右侧内容左移 */
.link-item-card:hover .link-avatar {
  transform: scale(0);
  flex: 0 0 0;
  width: 0;
  min-width: 0;
  padding: 0;
  opacity: 0;
  overflow: hidden;
  transition: transform 0.3s ease, flex-basis 0.3s ease, width 0.3s ease,
    opacity 0.25s ease;
}

.link-content {
  flex: 1;
  padding: 0 16px 0 0px;
  transition: margin-left 0.3s ease, transform 0.25s ease-out,
    border-color 0.25s ease-out, box-shadow 0.25s ease-out;
}

.link-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
}

.link-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  display: -webkit-box; /* 兼容 WebKit 旧版本 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

/* Badge 样式 - 右上角定位 */
.link-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 1px 6px;
  border-radius: 8px;
  transition: all 0.3s ease;
  letter-spacing: 0.2px;
  background-color: var(--vp-badge-tip-bg);
  color: var(--vp-badge-tip-text);

}
</style>