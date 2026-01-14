<script setup lang="ts" name="TeekLayoutProvider">
import type { TeekConfig } from "vitepress-theme-teek";
import Teek, { teekConfigContext, clockIcon } from "vitepress-theme-teek";
import { useData } from "vitepress";
import { watch, nextTick, ref, provide } from "vue";
// import { teekDocConfig } from "../config/teekConfig";
import { teekBlogCardConfig } from "../config/teekConfig";
import { useRibbon } from "../composables/useRibbon";
import { useRuntime } from "../composables/useRuntime";
import ConfigSwitch from "./ConfigSwitch.vue";
import ContributeChart from "./ContributeChart.vue";
import NotFound from "./404.vue";
import BannerImgArrow from "./BannerImgArrow/BannerImgArrow.vue"; //导入横幅图片箭头组件
import NoticeContent from "./NoticeContent.vue"; //导入公告组件
import GlobalGreet from "./GlobalGreet.vue"; //导入全局问候组件
import TitleChange from "./TitleChange.vue"; //导入网页标题变化
import ScrollProgressBar from "./ScrollProgressBar.vue"; //导入顶部滚动条组件
import DocFooterCopyright from "./DocFooterCopyright.vue"; //导入文档页脚版权组件
import BackTop from "./BackTop.vue"; //导入回到顶部组件
import Clock from "./Clock.vue"; // 时钟组件
import WelcomeCard from "./WelcomeCard.vue"; // 欢迎卡片
import RouteSwitchingLoading from "./RouteSwitchingLoading.vue"; // 过渡动画组件
import Twikoo from "./Twikoo/Twikoo.vue";
import ScrollToComment from "./ScrollToComment.vue";
import CalendarCard from "./CalendarCard.vue";
import ScheduleCard from "./ScheduleCard.vue";
import NeteaseMusicPlayer from "./NeteaseMusicPlayer.vue";
import ArticleInnerCover from "./ArticleInnerCover.vue";
const ns = "layout-provider";
const { frontmatter } = useData();

// // 默认文档风
// const currentStyle = ref("doc");
// const teekConfig = ref(teekDocConfig);

// 默认博客 卡片风
const currentStyle = ref("blog-card");
const teekConfig = ref(teekBlogCardConfig);
provide(teekConfigContext, teekConfig);

// 彩带背景
const { start: startRibbon, stop: stopRibbon } = useRibbon({
  immediate: false,
  clickReRender: true,
});

// 页脚运行时间
const { start: startRuntime, stop: stopRuntime } = useRuntime("2026-01-09 00:00:00", {
  prefix: `<span style="width: 16px; display: inline-block; vertical-align: -3px; margin-right: 3px;">${clockIcon}</span>小破站已运行 `,
});

const watchRuntimeAndRibbon = async (layout: string, style: string) => {
  const isHome = layout === "home";
  const isDoc = [undefined, "doc"].includes(layout);
  const isBlog = style.startsWith("blog");

  await nextTick();
  if (isHome && isBlog) startRuntime();
  else stopRuntime();

  // 关闭彩带背景，直接停止彩带
  stopRibbon();

  // 如果需要恢复彩带功能，可以注释上面一行，取消下面注释
  // if ((isHome && isBlog && style !== "blog-body") || (isDoc && teekConfig.value.pageStyle)) startRibbon();
  // else stopRibbon();
};

watch(frontmatter, async newVal => watchRuntimeAndRibbon(newVal.layout, currentStyle.value), { immediate: true });

const handleConfigSwitch = (config: TeekConfig, style: string) => {
  teekConfig.value = config;

  watchRuntimeAndRibbon(frontmatter.value.layout, style);
};
</script>

<template>
  <Teek.Layout>
    <template #layout-top>
      <!-- 全局问候组件 -->
      <GlobalGreet />
      <!-- 看板娘组件 -->
      <!-- <OhMyLive2D /> -->
      <!-- 顶部滚动条组件 -->
      <ScrollProgressBar />
      <!--网页标题切换组件  -->
      <TitleChange />
      <!-- 返回顶部组件 -->
      <!--<BackToTop /> -->

      <!-- 路由切换遮罩动画组件 -->
      <RouteSwitchingLoading />
    </template>

    <template #teek-theme-enhance-bottom>
      <div :class="[ns, 'flx-align-center']">
        <ConfigSwitch v-model="currentStyle" @switch="handleConfigSwitch" />
      </div>
    </template>

    <template #nav-screen-content-after>
      <ConfigSwitch v-model="currentStyle" @switch="handleConfigSwitch" />
    </template>

    <template #teek-archives-top-before>
      <ContributeChart />
    </template>

    <template #not-found>
      <!-- 404组件 -->
      <NotFound />
    </template>

    <template #teek-notice-content>
      <!-- 公告组件 -->
      <NoticeContent />
    </template>

    <template #teek-home-banner-feature-after>
      <!-- 横幅图片箭头组件 -->
      <BannerImgArrow />
    </template>

    <!-- 文章内封面图（位于正文前，可通过全局/Frontmatter 开关控制） -->
    <template #doc-before>
      <ClientOnly>
        <ArticleInnerCover />
      </ClientOnly>
    </template>

    <!-- 自定义卡片 -->
    <template #teek-home-card-my-after>
      <WelcomeCard />
      <CalendarCard />
      <ScheduleCard />
    </template>

    <!-- 自定义微信公众号卡片 -->
    <template #teek-home-card-doc-analysis-after></template>

    <!-- 回到顶部组件 -->
    <template #teek-home-bottom-after>
      <DocFooterCopyright />
    </template>

    <!-- 回到顶部组件插槽 -->
    <template #teek-back-top>
      <BackTop />
    </template>

    <!-- 右上角时钟组件 -->
    <template #nav-bar-content-after>
      <Clock />
    </template>

    <!-- 全局网易云音乐播放器组件 -->
    <template #layout-bottom>
      <NeteaseMusicPlayer />
    </template>

    <!-- 文章末尾版权说明 -->
    <template #doc-footer-before>
      <DocFooterCopyright />
    </template>

    <!-- 文章末尾评论组件 -->
    <template #teek-doc-after-appreciation-before>
      <Twikoo />
    </template>

    <template #teek-to-comment="{ show, icon, scrollToComment }">
      <ScrollToComment :show="show" :icon="icon" :scroll-to-comment="scrollToComment" />
    </template>
  </Teek.Layout>
</template>

<style lang="scss">
.tk-my.is-circle-bg {
  // margin-bottom: 15px;

  .tk-my__avatar.circle-rotate {
    // margin-top: 90px;

    .tk-avatar:not(.avatar-sticker) {
      border: 5px solid var(--vp-c-bg-elv);
    }
  }
}
</style>
