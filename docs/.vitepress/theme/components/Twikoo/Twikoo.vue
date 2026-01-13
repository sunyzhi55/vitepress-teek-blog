<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vitepress'

const envId = 'https://twikoo.seasir.top'
const twikooJs = ref(null)
const router = useRouter()

function initTwikoo() {
  try {
    twikoo.init({
      envId,
      onCommentLoaded: initLightGallery
    })
  } catch (e) { }
}

function initLightGallery() {
  var commentContents = [
    ...document.getElementsByClassName('vp-doc'),
    ...document.getElementsByClassName('tk-content')
  ];
  for (var i = 0; i < commentContents.length; i++) {
    var commentItem = commentContents[i];
    var imgEls = commentItem.getElementsByTagName('img');
    if (imgEls.length > 0) {
      for (var j = 0; j < imgEls.length; j++) {
        var imgEl = imgEls[j];
        if (imgEl.parentElement.tagName === 'A') continue;
        var aEl = document.createElement('a');
        aEl.setAttribute('class', 'tk-lg-link');
        aEl.setAttribute('href', imgEl.getAttribute('src'));
        aEl.setAttribute('data-src', imgEl.getAttribute('src'));
        aEl.appendChild(imgEl.cloneNode(false));
        imgEl.parentNode.insertBefore(aEl, imgEl.nextSibling);
        imgEl.remove();
      }
      lightGallery(commentItem, {
        selector: '.tk-lg-link',
        share: false
      })
    }
  }
}

function initJs() {
  if (twikooJs.value) {
    twikooJs.value.onload = initTwikoo
    router.onAfterRouteChanged = onRoute
  }
}

function onRoute(to) {
  if (to) setTimeout(initTwikoo, 1000)
}

onMounted(() => {
  initTwikoo()
  initJs()
})
</script>

<template>
  <div class="comment-container vp-raw">
    <!-- Twikoo -->
    <div id="twikoo"></div>
    <component :is="'script'" src="https://s4.zstatic.net/npm/twikoo@1.6.44/dist/twikoo.nocss.js"
      crossorigin="anonymous" ref="twikooJs"></component>
  </div>
</template>


<style>
@import "./comment.scss";
/*评论区样式 */

@import "./twikoo.scss";
/*Twikoo官方本地样式 */
</style>