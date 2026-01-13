/**
 * 工具函数 Composable
 * 提供通用的工具方法
 */

import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 节流函数
 */
export function useThrottle() {
  const throttle = (func: Function, wait: number) => {
    let timeout: number | null = null
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout!)
        func(...args)
      }
      clearTimeout(timeout!)
      timeout = window.setTimeout(later, wait)
    }
  }

  return { throttle }
}

/**
 * 防抖函数
 */
export function useDebounce() {
  const debounce = (func: Function, wait: number) => {
    let timeout: number | null = null
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout!)
        func(...args)
      }
      clearTimeout(timeout!)
      timeout = window.setTimeout(later, wait)
    }
  }

  return { debounce }
}

/**
 * 元素可见性检测
 */
export function useIntersectionObserver() {
  const isInViewport = (element: Element) => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  const isPartiallyVisible = (element: Element) => {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const windowWidth = window.innerWidth || document.documentElement.clientWidth
    
    return (rect.bottom > 0 && rect.top < windowHeight) &&
           (rect.right > 0 && rect.left < windowWidth)
  }

  const createObserver = (
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) => {
    if ('IntersectionObserver' in window) {
      return new IntersectionObserver(callback, options)
    }
    return null
  }

  return {
    isInViewport,
    isPartiallyVisible,
    createObserver
  }
}

/**
 * 响应式媒体查询
 */
export function useMediaQuery() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)

  const updateMediaQuery = () => {
    const width = window.innerWidth
    isMobile.value = width <= 768
    isTablet.value = width > 768 && width <= 1024
    isDesktop.value = width > 1024
  }

  onMounted(() => {
    updateMediaQuery()
    window.addEventListener('resize', updateMediaQuery)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateMediaQuery)
  })

  return {
    isMobile,
    isTablet,
    isDesktop
  }
}

/**
 * 缓动函数
 */
export function useEasing() {
  const easeOutQuart = (t: number) => {
    return 1 - (--t) * t * t * t
  }

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }

  const easeOutCirc = (t: number) => {
    return Math.sqrt(1 - (--t) * t)
  }

  return {
    easeOutQuart,
    easeInOutCubic,
    easeOutCirc
  }
}

/**
 * 随机数生成
 */
export function useRandom() {
  const randomBetween = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  const randomInt = (min: number, max: number) => {
    return Math.floor(randomBetween(min, max + 1))
  }

  const randomArray = <T>(array: T[]) => {
    return array[randomInt(0, array.length - 1)]
  }

  const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  return {
    randomBetween,
    randomInt,
    randomArray,
    uuid
  }
}

/**
 * 数值格式化
 */
export function useFormat() {
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const formatPercent = (num: number, decimals = 1) => {
    return `${(num * 100).toFixed(decimals)}%`
  }

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  return {
    formatNumber,
    formatPercent,
    formatBytes
  }
}