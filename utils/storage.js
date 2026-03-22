// utils/storage.js - 存储工具

const STORAGE_KEY = 'mood_records'
const dateUtil = require('./date.js')

/**
 * 获取所有记录
 */
function getAllRecords() {
  try {
    return wx.getStorageSync(STORAGE_KEY) || []
  } catch (e) {
    console.error('获取记录失败:', e)
    return []
  }
}

/**
 * 添加记录
 */
function addRecord(mood, text) {
  try {
    const records = getAllRecords()
    const now = Date.now()
    const newRecord = {
      id: now.toString(),
      date: dateUtil.formatDate(new Date()),
      mood: mood.type,
      moodEmoji: mood.emoji,
      text: text || '',
      createTime: now,
      updateTime: now
    }
    records.push(newRecord)
    wx.setStorageSync(STORAGE_KEY, records)
    return { success: true, record: newRecord }
  } catch (e) {
    console.error('添加记录失败:', e)
    return { success: false, error: e }
  }
}

/**
 * 根据日期获取记录
 */
function getRecordByDate(date) {
  const records = getAllRecords()
  return records.find(r => r.date === date) || null
}

/**
 * 获取今天的记录
 */
function getTodayRecord() {
  return getRecordByDate(dateUtil.formatDate(new Date()))
}

/**
 * 更新记录
 */
function updateRecord(id, updates) {
  try {
    const records = getAllRecords()
    const index = records.findIndex(r => r.id === id)
    if (index !== -1) {
      records[index] = {
        ...records[index],
        ...updates,
        updateTime: Date.now()
      }
      wx.setStorageSync(STORAGE_KEY, records)
      return { success: true, record: records[index] }
    }
    return { success: false, error: '记录不存在' }
  } catch (e) {
    console.error('更新记录失败:', e)
    return { success: false, error: e }
  }
}

/**
 * 删除记录
 */
function deleteRecord(id) {
  try {
    const records = getAllRecords()
    const filtered = records.filter(r => r.id !== id)
    wx.setStorageSync(STORAGE_KEY, filtered)
    return { success: true }
  } catch (e) {
    console.error('删除记录失败:', e)
    return { success: false, error: e }
  }
}

/**
 * 获取某月的记录
 */
function getMonthRecords(year, month) {
  const records = getAllRecords()
  return records.filter(r => {
    const d = new Date(r.date)
    return d.getFullYear() === year && d.getMonth() + 1 === month
  })
}

/**
 * 获取记录统计
 */
function getStatistics(year, month) {
  const records = getMonthRecords(year, month)
  const stats = {
    total: records.length,
    moods: {}
  }
  
  records.forEach(r => {
    if (!stats.moods[r.mood]) {
      stats.moods[r.mood] = 0
    }
    stats.moods[r.mood]++
  })
  
  return stats
}

/**
 * 清除所有记录
 */
function clearAllRecords() {
  try {
    wx.setStorageSync(STORAGE_KEY, [])
    return { success: true }
  } catch (e) {
    console.error('清除记录失败:', e)
    return { success: false, error: e }
  }
}

/**
 * 将记录映射到日历数据
 */
function mapRecordsToCalendar(calendarData, records) {
  const recordMap = {}
  records.forEach(r => {
    recordMap[r.date] = r
  })
  
  return calendarData.map(day => ({
    ...day,
    record: recordMap[day.date] || null
  }))
}

module.exports = {
  getAllRecords,
  addRecord,
  getRecordByDate,
  getTodayRecord,
  updateRecord,
  deleteRecord,
  getMonthRecords,
  getStatistics,
  clearAllRecords,
  mapRecordsToCalendar
}
