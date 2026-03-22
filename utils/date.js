// utils/date.js - 日期工具

/**
 * 格式化日期为 YYYY-MM-DD 格式
 */
function formatDate(date) {
  const d = date || new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * 格式化日期为中文格式
 */
function formatDateCN(date) {
  const d = date || new Date()
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  const weekDay = weekDays[d.getDay()]
  return `${year}年${month}月${day}日 星期${weekDay}`
}

/**
 * 获取月份的天数
 */
function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

/**
 * 获取月份第一天是星期几
 */
function getFirstDayOfMonth(year, month) {
  return new Date(year, month - 1, 1).getDay()
}

/**
 * 生成日历数据
 */
function generateCalendarData(year, month) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const today = formatDate(new Date())
  
  const calendar = []
  
  // 填充空白格子
  for (let i = 0; i < firstDay; i++) {
    calendar.push({
      day: '',
      date: '',
      isCurrentMonth: false,
      isToday: false
    })
  }
  
  // 填充日期
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    calendar.push({
      day: day,
      date: dateStr,
      isCurrentMonth: true,
      isToday: dateStr === today
    })
  }
  
  return calendar
}

/**
 * 获取上个月
 */
function getPrevMonth(year, month) {
  if (month === 1) {
    return { year: year - 1, month: 12 }
  }
  return { year, month: month - 1 }
}

/**
 * 获取下个月
 */
function getNextMonth(year, month) {
  if (month === 12) {
    return { year: year + 1, month: 1 }
  }
  return { year, month: month + 1 }
}

/**
 * 格式化时间戳为可读时间
 */
function formatTime(timestamp) {
  const d = new Date(timestamp)
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

/**
 * 格式化时间戳为完整日期时间
 */
function formatDateTime(timestamp) {
  const d = new Date(timestamp)
  const date = formatDate(d)
  const time = formatTime(timestamp)
  return `${date} ${time}`
}

module.exports = {
  formatDate,
  formatDateCN,
  getDaysInMonth,
  getFirstDayOfMonth,
  generateCalendarData,
  getPrevMonth,
  getNextMonth,
  formatTime,
  formatDateTime
}
