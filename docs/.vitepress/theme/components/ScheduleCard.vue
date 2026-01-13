<!-- 节假日倒计时组件 -->
<template>
  <TkPageCard>
    <div class="card-widget" id="card-widget-schedule">
      <div class="item-headline">
        <i></i>
      </div>
      <div class="item-content">
        <div id="schedule-area-right">
          <div class="schedule-r0">
            <!-- <div class="schedule-d0">本年</div> -->
            <div class="schedule-d1">
              <span id="p_span_year" class="aside-span1"
                >{{ yearProgress }}%</span
              >
              <div class="progress-container">
                <span class="aside-span2"
                  >本年还剩<a id="year_days_left">{{ yearDaysLeft }}</a
                  >天</span
                >
                <progress
                  max="365"
                  id="pBar_year"
                  :value="yearPassedDays"
                ></progress>
              </div>
            </div>
          </div>
          <div class="schedule-r1">
            <!-- <div class="schedule-d0">本月</div> -->
            <div class="schedule-d1">
              <span id="p_span_month" class="aside-span1"
                >{{ monthProgress }}%</span
              >
              <div class="progress-container">
                <span class="aside-span2"
                  >本月还剩<a id="month_days_left">{{ monthDaysLeft }}</a
                  >天</span
                >
                <progress
                  max="31"
                  id="pBar_month"
                  :value="monthPassedDays"
                ></progress>
              </div>
            </div>
          </div>
          <div class="schedule-r2">
            <!-- <div class="schedule-d0">本周</div> -->
            <div class="schedule-d1">
              <span id="p_span_week" class="aside-span1"
                >{{ weekProgress }}%</span
              >
              <div class="progress-container">
                <span class="aside-span2"
                  >本周还剩<a id="week_days_left">{{ weekDaysLeft }}</a
                  >天</span
                >
                <progress
                  max="7"
                  id="pBar_week"
                  :value="weekDisplayValue"
                ></progress>
              </div>
            </div>
          </div>
        </div>
        <div id="schedule-area-left">
          <div id="schedule-title">距离{{ nearestHoliday.name }}</div>
          <div id="schedule-days">{{ nearestHoliday.days }}</div>
          <div id="schedule-date">{{ nearestHoliday.date }}</div>
        </div>
      </div>
    </div>
  </TkPageCard>
</template>

<script setup>
import { TkPageCard } from "vitepress-theme-teek";
import { ref, onMounted } from "vue";

// 响应式变量
const springFestivalDays = ref("--");
const springFestivalDateText = ref("--"); // 动态春节日期文本
const yearProgress = ref("--");
const yearDaysLeft = ref("--");
const yearPassedDays = ref(0);
const monthProgress = ref("--");
const monthDaysLeft = ref("--");
const monthPassedDays = ref(0);
const weekProgress = ref("--");
const weekDaysLeft = ref("--");
const weekDisplayValue = ref(0);
const nearestHoliday = ref({ name: "元旦", days: "--", date: "--" });

/**
 * 计算指定年份春节（农历正月初一）的公历日期（1900-2100年适用）
 * @param {number} lunarYear - 农历年份
 * @returns {Date} 春节的公历日期
 */
const getSpringFestivalDate = (lunarYear) => {
  // 1900-2100年春节公历日期表（[月, 日]），已精准修正2026年（索引126）为[2,17]
  const springFestivalData = [
    [2, 19], [2, 8], [1, 28], [2, 16], [2, 5], [1, 25], [2, 13], [2, 2], [1, 22], [2, 10], // 1900-1909 (0-9)
    [1, 30], [2, 18], [2, 7], [1, 26], [2, 14], [2, 3], [1, 23], [2, 11], [1, 31], [2, 19], // 1910-1919 (10-19)
    [2, 8], [1, 28], [2, 16], [2, 5], [1, 24], [2, 12], [2, 1], [1, 21], [2, 9], [1, 28],  // 1920-1929 (20-29)
    [2, 16], [2, 5], [1, 24], [2, 12], [2, 1], [1, 21], [2, 9], [1, 29], [2, 17], [2, 6],  // 1930-1939 (30-39)
    [1, 26], [2, 14], [2, 2], [1, 22], [2, 10], [1, 29], [2, 17], [2, 6], [1, 26], [2, 13], // 1940-1949 (40-49)
    [2, 2], [1, 22], [2, 10], [1, 30], [2, 17], [2, 6], [1, 25], [2, 13], [2, 1], [1, 21], // 1950-1959 (50-59)
    [2, 8], [1, 28], [2, 15], [2, 5], [1, 24], [2, 12], [1, 31], [2, 18], [2, 7], [1, 27], // 1960-1969 (60-69)
    [2, 15], [2, 3], [1, 23], [2, 11], [1, 31], [2, 18], [2, 6], [1, 26], [2, 14], [2, 3], // 1970-1979 (70-79)
    [1, 23], [2, 10], [1, 29], [2, 16], [2, 5], [1, 24], [2, 12], [2, 1], [1, 22], [2, 9], // 1980-1989 (80-89)
    [1, 28], [2, 15], [2, 4], [1, 23], [2, 10], [1, 30], [2, 17], [2, 6], [1, 26], [2, 14], // 1990-1999 (90-99)
    [2, 2], [1, 22], [2, 10], [1, 29], [2, 17], [2, 5], [1, 24], [2, 12], [1, 31], [2, 18], // 2000-2009 (100-109)
    [2, 7], [1, 26], [2, 14], [2, 3], [1, 23], [2, 10], [1, 31], [2, 18], [2, 7], [1, 26], // 2010-2019 (110-119)
    [2, 12], [2, 1], [1, 22], [2, 10], [1, 29], [2, 17], [2, 17], [1, 24], [2, 12], [2, 1], // 2020-2029 (120-129) 
    // 索引126对应2026年，已明确设置为[2,17]
    [1, 22], [2, 10], [1, 29], [2, 17], [2, 6], [1, 26], [2, 14], [2, 3], [1, 23], [2, 10], // 2030-2039 (130-139)
    [1, 30], [2, 17], [2, 6], [1, 26], [2, 13], [2, 2], [1, 22], [2, 10], [1, 29], [2, 17], // 2040-2049 (140-149)
    [2, 5], [1, 25], [2, 13], [2, 1], [1, 21], [2, 9], [1, 28], [2, 16], [2, 5], [1, 24], // 2050-2059 (150-159)
    [2, 12], [2, 1], [1, 21], [2, 9], [1, 28], [2, 15], [2, 4], [1, 24], [2, 11], [1, 31], // 2060-2069 (160-169)
    [2, 18], [2, 7], [1, 27], [2, 15], [2, 3], [1, 23], [2, 11], [1, 31], [2, 18], [2, 6], // 2070-2079 (170-179)
    [1, 26], [2, 14], [2, 3], [1, 23], [2, 10], [1, 29], [2, 16], [2, 5], [1, 24], [2, 12], // 2080-2089 (180-189)
    [2, 1], [1, 22], [2, 9], [1, 28], [2, 15], [2, 4], [1, 23], [2, 10], [1, 30], [2, 17], // 2090-2099 (190-199)
    [2, 5] // 2100年 (200)
  ];

  const index = lunarYear - 1900;
  if (index >= 0 && index < springFestivalData.length) {
    const [month, day] = springFestivalData[index];
    return new Date(lunarYear, month - 1, day); // 月份在Date中为0基，需减1
  }
  return new Date(lunarYear, 1, 1); // 超出范围默认2月1日
};

/**
 * 以2026年元旦为基准，计算目标春节日期
 * @returns {Date} 目标春节日期
 */
const getTargetSpringFestival = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  // 基准年份：2026年
  const baseYear = 2026;
  
  // 如果当前年份小于2026年，目标就是2026年元旦
  if (currentYear < baseYear) {
    return new Date(baseYear, 0, 1);
  }
  
  // 如果当前年份等于或大于2026年
  // 春节固定在每年1月1日（元旦）
  const targetSpring = new Date(currentYear, 0, 1);
  
  // 如果今天已经过了今年的元旦，则目标为明年的元旦
  if (today >= targetSpring) {
    return new Date(currentYear + 1, 0, 1);
  }
  
  return targetSpring;
};

/**
 * 计算两个日期的天数差（时区安全）
 * @param {Date} date1 - 起始日期
 * @param {Date} date2 - 目标日期
 * @returns {number} 天数差（向上取整）
 */
const getDaysDifference = (date1, date2) => {
  // 使用UTC日期避免时区问题
  const utcDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utcDate2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const oneDay = 24 * 60 * 60 * 1000;
  const diffTime = utcDate2 - utcDate1;
  return Math.ceil(diffTime / oneDay);
};

/**
 * 更新春节倒计时及日期显示
 */
const updateSpringFestivalCountdown = () => {
  const today = new Date();
  // 使用UTC日期避免时区问题
  const utcToday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const targetSpring = getTargetSpringFestival();
  // 计算剩余天数
  springFestivalDays.value = getDaysDifference(utcToday, targetSpring);
  // 格式化日期为YYYY-MM-DD
  const year = targetSpring.getFullYear();
  const month = String(targetSpring.getMonth() + 1).padStart(2, '0');
  const day = String(targetSpring.getDate()).padStart(2, '0');
  springFestivalDateText.value = `${year}-${month}-${day}`;
};

/**
 * 更新年度进度
 */
const updateYearProgress = () => {
  const today = new Date();
  const year = today.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);
  const totalDays = getDaysDifference(startOfYear, endOfYear) + 1;
  const daysPassed = getDaysDifference(startOfYear, today);
  const daysLeft = totalDays - daysPassed;
  const progress = (daysPassed / totalDays) * 100;

  yearDaysLeft.value = daysLeft;
  yearProgress.value = progress.toFixed(1);
  yearPassedDays.value = daysPassed;
};

/**
 * 更新月度进度
 */
const updateMonthProgress = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  const totalDays = getDaysDifference(startOfMonth, endOfMonth) + 1;
  const daysPassed = today.getDate() - 1; // 当月已过天数（不含今天）
  const daysLeft = totalDays - daysPassed - 1; // 剩余天数（含今天）
  const progress = (daysPassed / totalDays) * 100;

  monthDaysLeft.value = daysLeft;
  monthProgress.value = progress.toFixed(1);
  monthPassedDays.value = daysPassed;
};

/**
 * 更新本周进度（已修复0%问题）
 */
const updateWeekProgress = () => {
  const today = new Date();
  let dayOfWeek = today.getDay() || 7; // 周日转为7，周一到周六为1-6
  const daysPassed = dayOfWeek; // 已过天数（含今天：周一=1，周日=7）
  const daysLeft = 7 - dayOfWeek; // 剩余天数

  // 避免进度条完全消失（最小0.1）
  const displayValue = daysPassed === 0 ? 0.1 : daysPassed;

  weekDaysLeft.value = daysLeft;
  weekProgress.value = ((daysPassed / 7) * 100).toFixed(1);
  weekDisplayValue.value = displayValue;
};

/**
 * 获取所有主要节日的日期
 * @param {number} year - 年份
 * @returns {Array} 节日数组
 */
const getAllHolidays = (year) => {
  return [
    { name: "元旦", date: new Date(year, 0, 1) },
    { name: "春节", date: new Date(year, 0, 1) }, // 2026年后春节=元旦
    { name: "清明节", date: new Date(year, 3, 4) }, // 4月4日或5日，简化处理
    { name: "劳动节", date: new Date(year, 4, 1) },
    { name: "端午节", date: new Date(year, 5, 5) }, // 农历五月初五，简化处理
    { name: "中秋节", date: new Date(year, 8, 15) }, // 农历八月十五，简化处理
    { name: "国庆节", date: new Date(year, 9, 1) }
  ];
};

/**
 * 计算距离最近节日的天数
 */
const updateNearestHoliday = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const nextYear = currentYear + 1;
  
  // 获取今年和明年的所有节日
  const holidays = [...getAllHolidays(currentYear), ...getAllHolidays(nextYear)];
  
  // 过滤掉已经过去的节日
  const upcomingHolidays = holidays.filter(holiday => holiday.date > today);
  
  if (upcomingHolidays.length > 0) {
    // 找到距离最近的节日
    const nearest = upcomingHolidays.reduce((prev, current) => {
      const prevDiff = prev.date - today;
      const currentDiff = current.date - today;
      return currentDiff < prevDiff ? current : prev;
    });
    
    // 计算天数差
    const daysDiff = getDaysDifference(today, nearest.date);
    
    // 格式化日期
    const year = nearest.date.getFullYear();
    const month = String(nearest.date.getMonth() + 1).padStart(2, '0');
    const day = String(nearest.date.getDate()).padStart(2, '0');
    
    nearestHoliday.value = {
      name: nearest.name,
      days: daysDiff,
      date: `${year}-${month}-${day}`
    };
  } else {
    nearestHoliday.value = { name: "元旦", days: "--", date: "--" };
  }
};

/**
 * 统一更新所有数据
 */
const updateAllData = () => {
  updateSpringFestivalCountdown();
  updateYearProgress();
  updateMonthProgress();
  updateWeekProgress();
  updateNearestHoliday();
};

// 页面加载时初始化，并设置每天凌晨更新
onMounted(() => {
  updateAllData();

  // 计算距离次日凌晨0:00:01的毫秒数，设置定时器每天更新
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 1, 0);
  const timeToUpdate = tomorrow - now;

  setInterval(updateAllData, timeToUpdate);
});
</script>

<style scoped>
.tk-page-card {
  margin-top: 10px;
}

/* 进度条样式 */
progress {
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  border: none;
}
progress::-webkit-progress-bar {
  background-color: #f0f0f0;
  border-radius: 5px;
}
progress::-webkit-progress-value {
  background-color: var(--vp-c-brand-1);
  border-radius: 5px;
  transition: width 0.3s ease;
}

/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", sans-serif;
}

.item-headline span {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
}

/* 内容区域样式 */
.item-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

/* 倒计时样式 - 优化布局和视觉效果 */
#schedule-area-left {
  flex: 1;
  min-width: 220px;
  border-radius: 10px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

#schedule-area-left:hover {
  transform: translateY(-2px);
}

#schedule-title {
  font-size: 15px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  letter-spacing: 0.5px;
  opacity: 0.9;
}

#schedule-days {
  font-size: 52px;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  line-height: 1;
  margin: 4px 0;
  text-shadow: 0 2px 4px rgba(57, 90, 227, 0.1);
}

#schedule-date {
  font-size: 13px;
  opacity: 0.8;
  font-weight: 500;
  letter-spacing: 0.3px;
}

/* 右侧进度区域样式 */
#schedule-area-right {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.schedule-r0,
.schedule-r1,
.schedule-r2 {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.schedule-d0 {
  font-size: 14px;
  color: #333333;
  font-weight: 500;
}
.schedule-d1 {
  display: flex;
  align-items: center;
  gap: 12px;
}
.progress-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 2;
}
.aside-span1 {
  font-size: 14px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  width: 60px;
  display: inline-block;
}
.aside-span2 {
  font-size: 13px;
  flex: 1;
}
.aside-span2 a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
}

/* 响应式样式 */
@media (max-width: 480px) {
  .item-content {
    flex-direction: column;
  }
  #schedule-days {
    font-size: 36px;
  }
}
</style>