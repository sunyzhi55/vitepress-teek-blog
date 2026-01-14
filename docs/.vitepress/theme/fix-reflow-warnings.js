/**
 * 强制重排警告修复方案
 * 问题：滚动事件中频繁调用DOM查询和布局计算函数导致强制重排
 * 解决方案：使用节流和缓存优化DOM操作
 */

// 节流函数 - 限制函数执行频率
function throttle(func, delay) {
  let timeoutId;
  let lastExecTime = 0;

  return function (...args) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          func.apply(this, args);
          lastExecTime = Date.now();
        },
        delay - (currentTime - lastExecTime)
      );
    }
  };
}

// 缓存DOM查询结果
const domCache = new Map();

function getCachedElement(selector) {
  if (!domCache.has(selector)) {
    domCache.set(selector, document.querySelector(selector));
  }
  return domCache.get(selector);
}

// 优化后的滚动位置检查函数
function optimizedCheckScrollPosition() {
  const commentElement = getCachedElement("#twikoo, .my-message-section, .message-card");

  if (commentElement) {
    // 使用requestAnimationFrame避免强制重排
    requestAnimationFrame(() => {
      const rect = commentElement.getBoundingClientRect();
      // 如果评论区元素在视口顶部附近（距离顶部小于200px），则认为已经滚动到评论区
      const isScrolledToComment = rect.top <= 200;

      // 更新响应式数据
      if (window.__vueApps) {
        window.__vueApps.forEach(app => {
          if (app._component && app._component.isScrolledToComment !== undefined) {
            app._component.isScrolledToComment = isScrolledToComment;
            app._component.showScrollButton = !isScrolledToComment;
          }
        });
      }
    });
  }
}

// 优化后的滚动进度计算函数
function optimizedHandleScroll() {
  requestAnimationFrame(() => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const progress = (scrollTop / totalHeight) * 100;

    // 更新响应式数据
    if (window.__vueApps) {
      window.__vueApps.forEach(app => {
        if (app._component && app._component.progress !== undefined) {
          app._component.progress = progress;
        }
      });
    }
  });
}

// 应用优化
function applyReflowOptimizations() {
  // 节流优化 - 限制为每100ms执行一次
  const throttledScrollPositionCheck = throttle(optimizedCheckScrollPosition, 100);
  const throttledProgressUpdate = throttle(optimizedHandleScroll, 100);

  // 替换原有的滚动事件监听
  if (typeof window !== "undefined") {
    // 移除可能存在的重复监听器
    ["scroll", "resize"].forEach(event => {
      const originalListeners = window._originalListeners || {};
      if (originalListeners[event]) {
        originalListeners[event].forEach(([listener, options]) => {
          window.removeEventListener(event, listener, options);
        });
      }
    });

    // 添加优化后的监听器
    window.addEventListener("scroll", throttledScrollPositionCheck, { passive: true });
    window.addEventListener("scroll", throttledProgressUpdate, { passive: true });

    // 保存原始监听器引用以便清理
    window._originalListeners = {
      scroll: [
        [throttledScrollPositionCheck, { passive: true }],
        [throttledProgressUpdate, { passive: true }],
      ],
    };
  }
}

// 导出优化函数
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    throttle,
    getCachedElement,
    optimizedCheckScrollPosition,
    optimizedHandleScroll,
    applyReflowOptimizations,
  };
}

export { throttle, getCachedElement, optimizedCheckScrollPosition, optimizedHandleScroll, applyReflowOptimizations };
