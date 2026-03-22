// pages/mine/mine.js
const storageUtil = require('../../utils/storage.js')
const moodUtil = require('../../utils/mood.js')

Page({
  data: {
    stats: null,
    moodStats: [],
    totalRecords: 0,
    version: '1.0.0'
  },

  onLoad() {
    this.loadStatistics()
  },

  onShow() {
    this.loadStatistics()
  },

  loadStatistics() {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    
    const stats = storageUtil.getStatistics(year, month)
    const totalRecords = storageUtil.getAllRecords().length
    
    // 转换为图表数据
    const moodStats = []
    const moods = moodUtil.getAllMoods()
    
    moods.forEach(mood => {
      const count = stats.moods[mood.type] || 0
      if (count > 0) {
        moodStats.push({
          ...mood,
          count,
          percent: stats.total > 0 ? Math.round(count / stats.total * 100) : 0
        })
      }
    })
    
    // 按数量排序
    moodStats.sort((a, b) => b.count - a.count)
    
    this.setData({
      stats,
      moodStats,
      totalRecords
    })
  },

  onClearData() {
    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有心情记录吗？此操作不可恢复！',
      confirmColor: '#FF6B6B',
      confirmText: '清除',
      success: (res) => {
        if (res.confirm) {
          const result = storageUtil.clearAllRecords()
          if (result.success) {
            wx.showToast({
              title: '已清除',
              icon: 'success'
            })
            this.loadStatistics()
          }
        }
      }
    })
  },

  onAbout() {
    wx.showModal({
      title: '关于心情日志',
      content: '版本：1.0.0\n\n一款极简的心情记录小程序，帮助你轻松记录每一天的情绪变化。\n\n数据仅存储在本地，保护你的隐私。',
      showCancel: false,
      confirmText: '知道了'
    })
  }
})
