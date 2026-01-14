<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";

const { frontmatter, site, page } = useData();

const enabled = computed(() => {
  // 允许 frontmatter 覆盖：articleInnerCover: true/false
  const fm = (frontmatter.value as any)?.articleInnerCover;
  if (typeof fm === "boolean") return fm;

  // 全局开关：themeConfig.articleInnerCover.enabled
  const globalEnabled = (site.value as any)?.themeConfig?.articleInnerCover?.enabled;
  return typeof globalEnabled === "boolean" ? globalEnabled : true;
});

const isDocLikePage = computed(() => {
  const fm = frontmatter.value as any;
  if (fm?.home === true) return false;
  if (fm?.layout === "home") return false;
  return true;
});

const rawCover = computed(() => {
  const fm = frontmatter.value as any;
  const v = fm?.coverImg ?? fm?.cover ?? fm?.image;
  if (Array.isArray(v)) return v[0];
  return v;
});

const coverSrc = computed(() => {
  if (!rawCover.value) return "";
  const src = String(rawCover.value);
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//")) return src;
  if (src.startsWith("/")) return withBase(src);
  return withBase(`/${src.replace(/^\.\//, "")}`);
});

const alt = computed(() => {
  const fm = frontmatter.value as any;
  return fm?.title || page.value.title || "";
});
</script>

<template>
  <div v-if="enabled && isDocLikePage && coverSrc" class="tk-article-inner-cover">
    <img :src="coverSrc" :alt="alt" loading="lazy" decoding="async" />
  </div>
</template>

<style scoped>
.tk-article-inner-cover {
  margin: 10px 0 18px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--vp-shadow-2);
}

.tk-article-inner-cover img {
  display: block;
  width: 100%;
  max-height: 360px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .tk-article-inner-cover img {
    max-height: 220px;
  }
}
</style>
