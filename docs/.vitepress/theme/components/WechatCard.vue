<template>
  <div class="tk-page-card card-widget right-widget" id="card-wechat">
    <div id="flip-wrapper">
      <!-- 正面：公众号引导图 -->
      <div class="front face"></div>

      <!-- 背面：文字+二维码 -->
      <div class="back face">
        <div class="back-text">
          <span class="scan-text">扫一扫</span>
          <br />
          <span>不错过精彩文章</span>
        </div>
        <div class="qrcode-container">
          <img
            src="https://resource-ai.helplook.net/docker_production/qkknm3s7/article/sOZHg5pK/67fe1ccc4ad95.jpg"
            alt="公众号二维码"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 此处无需额外逻辑，保持组件简洁
</script>

<style scoped>
/* 外层容器样式 */
.card-widget.right-widget#card-wechat {
  width: 280px;
  height: 110px;
  perspective: 1000px;
  cursor: pointer;
  background-color: #57bd6a;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

/* 翻转容器样式 */
#flip-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

/* 正反面通用样式 */
.face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

/* 正面样式（保持图片） */
.front.face {
  background: url(https://bu.dusays.com/2023/01/13/63c02edf44033.png) center
    center / contain no-repeat;
}

/* 背面样式（改为文字+二维码布局） */
.back.face {
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
}

/* 背面文字容器样式 */
.back-text {
  flex: 1;
  color: #fff;
  line-height: 1.5;
}

/* "扫一扫"文字样式（更大且加粗） */
.scan-text {
  font-size: 28px;
  font-weight: 700;
}

/* "不错过精彩文章"文字样式 */
.back-text span:last-child {
  font-size: 18px;
}

/* 二维码容器样式 */
.qrcode-container {
  width: 80px;
  height: 80px;
  background-color: #fff;
  padding: 5px;
  box-sizing: border-box;
}

.qrcode-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 鼠标悬浮翻转效果 */
#card-wechat:hover #flip-wrapper {
  transform: rotateY(180deg);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .card-widget.right-widget#card-wechat {
    width: 100%;
    height: 100px;
    margin: 0 auto 15px;
    max-width: none;
  }

  .back.face {
    padding: 0 20px;
    justify-content: space-between;
  }

  .scan-text {
    font-size: 24px;
  }

  .back-text span:last-child {
    font-size: 16px;
  }

  .qrcode-container {
    width: 70px;
    height: 70px;
    padding: 4px;
    flex-shrink: 0;
  }
}

@media (max-width: 480px) {
  .card-widget.right-widget#card-wechat {
    height: 90px;
  }

  .back.face {
    padding: 0 15px;
  }

  .scan-text {
    font-size: 22px;
  }

  .back-text span:last-child {
    font-size: 14px;
  }

  .qrcode-container {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 375px) {
  .card-widget.right-widget#card-wechat {
    height: 80px;
  }

  .back.face {
    padding: 0 12px;
  }

  .scan-text {
    font-size: 20px;
  }

  .back-text span:last-child {
    font-size: 13px;
  }

  .qrcode-container {
    width: 55px;
    height: 55px;
  }
}

/* 触摸设备适配 */
@media (hover: none) and (pointer: coarse) {
  #card-wechat {
    cursor: pointer;
  }

  #card-wechat:active #flip-wrapper {
    transform: rotateY(180deg);
  }
}
</style>
