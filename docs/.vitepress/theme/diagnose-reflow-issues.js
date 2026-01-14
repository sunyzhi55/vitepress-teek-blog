/**
 * 强制重排问题诊断工具
 * 用于识别导致强制重排的具体组件和代码位置
 */

// 性能监控函数
function monitorForcedReflows() {
  if (typeof window === "undefined") return;

  // 保存原始方法
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  const originalGetComputedStyle = window.getComputedStyle;
  const originalQuerySelector = Document.prototype.querySelector;
  const originalQuerySelectorAll = Document.prototype.querySelectorAll;

  let reflowCount = 0;
  let lastReportTime = 0;

  // 重写getBoundingClientRect方法
  Element.prototype.getBoundingClientRect = function () {
    reflowCount++;

    // 记录调用堆栈
    const stack = new Error().stack;
    const timestamp = Date.now();

    // 每5秒报告一次
    if (timestamp - lastReportTime > 5000) {
      console.warn(`[Reflow Monitor] 强制重排检测 (${reflowCount}次):`, {
        element: this.outerHTML.substring(0, 100),
        selector: this.matches
          ? Array.from(document.querySelectorAll("*")).find(el => el === this)?.tagName
          : "unknown",
        stack: stack ? stack.split("\n").slice(2, 6).join("\n") : "No stack",
      });
      lastReportTime = timestamp;
    }

    return originalGetBoundingClientRect.call(this);
  };

  // 重写querySelector方法
  Document.prototype.querySelector = function (selector) {
    const result = originalQuerySelector.call(this, selector);

    if (
      result &&
      (selector.includes("#twikoo") || selector.includes(".my-message-section") || selector.includes(".message-card"))
    ) {
      console.warn(`[Reflow Monitor] 评论区DOM查询: ${selector}`, {
        caller: new Error().stack.split("\n")[2]?.trim(),
      });
    }

    return result;
  };

  // 监听滚动事件中的性能问题
  let scrollHandlerCount = 0;
  const scrollHandlers = new Set();

  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, handler, options) {
    if (type === "scroll" && typeof handler === "function") {
      scrollHandlerCount++;
      scrollHandlers.add(handler);

      console.warn(`[Reflow Monitor] 滚动事件监听器 #${scrollHandlerCount} 已添加`, {
        target: this === window ? "window" : this.constructor.name,
        handler: handler.name || "anonymous",
        passive: options?.passive ? "是" : "否",
      });

      // 包装handler以监控性能
      const wrappedHandler = function (...args) {
        const startTime = performance.now();
        handler.apply(this, args);
        const duration = performance.now() - startTime;

        if (duration > 16) {
          // 超过一帧的时间
          console.warn(`[Reflow Monitor] 滚动事件处理耗时 ${duration.toFixed(2)}ms`, {
            handler: handler.name || "anonymous",
            duration: duration,
          });
        }
      };

      return originalAddEventListener.call(this, type, wrappedHandler, options);
    }

    return originalAddEventListener.call(this, type, handler, options);
  };

  console.log("[Reflow Monitor] 强制重排监控已启动");

  // 返回清理函数
  return function cleanup() {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    Document.prototype.querySelector = originalQuerySelector;
    EventTarget.prototype.addEventListener = originalAddEventListener;
    console.log("[Reflow Monitor] 监控已停止");
  };
}

// 启动监控
if (typeof window !== "undefined") {
  window.__reflowMonitorCleanup = monitorForcedReflows();

  // 5分钟后自动停止监控
  setTimeout(
    () => {
      if (window.__reflowMonitorCleanup) {
        window.__reflowMonitorCleanup();
        window.__reflowMonitorCleanup = null;
      }
    },
    5 * 60 * 1000
  );
}

export default monitorForcedReflows;
