// 被动事件监听器修复工具 - 针对 vitepress-theme-teek 主题
// 从根源修复非被动触摸事件监听器警告

if (typeof window !== "undefined") {
  // 保存原始的 addEventListener
  const originalAddEventListener = EventTarget.prototype.addEventListener;

  // 重写 addEventListener 方法，专门针对主题组件进行修复
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    // 针对主题增强组件的触摸事件强制设置被动模式
    if (type === "touchstart" || type === "touchmove" || type === "touchend") {
      // 检查是否是主题相关的元素
      const isThemeElement =
        this.classList &&
        (this.classList.contains("tk-theme-enhance") ||
          this.classList.contains("tk-theme-enhance__helper") ||
          this.classList.contains("tk-popover") ||
          this.classList.contains("tk-theme-enhance__popover"));

      if (isThemeElement || !options || (typeof options === "object" && !options.passive)) {
        // 设置被动模式
        if (typeof options === "boolean") {
          options = {
            capture: options,
            passive: true,
          };
        } else if (typeof options === "object") {
          options.passive = true;
        } else {
          options = { passive: true };
        }

        // console.log(`✅ 已修复 ${type} 事件的被动模式设置`);
      }
    }

    return originalAddEventListener.call(this, type, listener, options);
  };

  //   console.log('✅ vitepress-theme-teek 被动事件监听器修复已启用');
}
