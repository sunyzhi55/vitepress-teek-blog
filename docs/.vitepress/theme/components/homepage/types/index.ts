// 技能图标接口
export interface SkillIcon {
  id: string
  title: string
  image: string
  background: string
  category?: string
}

// 技能信息接口
export interface SkillInfo {
  icon: SkillIcon
  name: string
  level?: number
}

// 生涯经历接口
export interface CareerItem {
  id: string
  name: string
  period?: string
  description?: string
  color: string
}

// 个人信息接口
export interface PersonalInfo {
  name: string
  title: string
  description: string
  birthYear: number
  school: string
  major: string
  currentJob: string
  location: string
  avatar: string
}

// 统计数据接口
export interface StatisticData {
  todayVisitors: number
  todayViews: number
  yesterdayVisitors: number
  yesterdayViews: number
  monthViews: number
  totalViews: number
}

// 动漫项目接口
export interface AnimeItem {
  id: string
  title: string
  cover: string
  url: string
}

// 菜单项接口
export interface MenuItem {
  id: string
  title: string
  url?: string
  icon?: string
  children?: MenuChildItem[]
}

export interface MenuChildItem {
  id: string
  title: string
  url: string
  icon?: string
}

// 标签接口
export interface AuthorTag {
  id: string
  text: string
  emoji: string
}

// 卡片内容接口
export interface CardContent {
  tips: string
  title: string
  description?: string
  background?: string
  icon?: string
}

// 游戏信息接口
export interface GameInfo {
  name: string
  uid: string
  background: string
}

// 音乐偏好接口
export interface MusicPreference {
  title: string
  artists: string[]
  background: string
  description: string
}

// 主题配置接口
export interface ThemeConfig {
  primaryColor: string
  isDark: boolean
}

// 动画配置接口
export interface AnimationConfig {
  duration: number
  delay: number
  easing: string
}

// 响应式断点
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// 组件Props基础接口
export interface BaseProps {
  class?: string
  style?: string | Record<string, string>
}

// 事件处理函数类型
export type EventHandler = (event: Event) => void

// 通用回调函数类型
export type Callback = () => void

// 异步回调函数类型
export type AsyncCallback = () => Promise<void>