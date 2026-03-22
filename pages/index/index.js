// pages/index/index.js
const moodUtil = require('../../utils/mood.js')
const storageUtil = require('../../utils/storage.js')
const dateUtil = require('../../utils/date.js')

Page({
  data: {
    todayDate: '',
    todayDateCN: '',
    moods: [],
    selectedMood: null,
    text: '',
    hasRecord: false,
    todayRecord: null,
    maxLength: 100,
    isEditing: false
  },

  onLoad() {
    this.initPage()
  },

  onShow() {
    // 每次显示页面时刷新数据
    this.loadTodayRecord()
  },

  initPage() {
    const today = new Date()
    this.setData({
      todayDate: dateUtil.formatDate(today),
      todayDateCN: dateUtil.formatDateCN(today),
      moods: moodUtil.getAllMoods()
    })
    this.loadTodayRecord()
  },

  loadTodayRecord() {
    const record = storageUtil.getTodayRecord()
    if (record) {
      const mood = moodUtil.getMoodByType(record.mood)
      this.setData({
        hasRecord: true,
        todayRecord: {
          ...record,
          createTimeStr: dateUtil.formatTime(record.createTime)
        },
        selectedMood: mood,
        text: record.text || '',
        isEditing: false
      })
    } else {
      this.setData({
        hasRecord: false,
        todayRecord: null,
        selectedMood: null,
        text: '',
        isEditing: false
      })
    }
  },

  onMoodSelect(e) {
    const { mood } = e.currentTarget.dataset
    this.setData({
      selectedMood: mood
    })
    
    // 震动反馈
    wx.vibrateShort({
      type: 'light'
    })
  },

  onTextInput(e) {
    const text = e.detail.value
    if (text.length <= this.data.maxLength) {
      this.setData({ text })
    }
  },

  onSave() {
    const { selectedMood, text, hasRecord, todayRecord } = this.data
    
    if (!selectedMood) {
      wx.showToast({
        title: '请选择心情',
        icon: 'none'
      })
      return
    }

    if (hasRecord && todayRecord) {
      // 更新记录
      const result = storageUtil.updateRecord(todayRecord.id, {
        mood: selectedMood.type,
        moodEmoji: selectedMood.emoji,
        text: text
      })
      
      if (result.success) {
        wx.showToast({
          title: '更新成功',
          icon: 'success'
        })
        this.loadTodayRecord()
      } else {
        wx.showToast({
          title: '更新失败',
          icon: 'error'
        })
      }
    } else {
      // 新增记录
      const result = storageUtil.addRecord(selectedMood, text)
      
      if (result.success) {
        wx.showToast({
          title: '记录成功',
          icon: 'success'
        })
        this.loadTodayRecord()
      } else {
        wx.showToast({
          title: '记录失败',
          icon: 'error'
        })
      }
    }
  },

  onEdit() {
    this.setData({
      isEditing: true
    })
  },

  onCancelEdit() {
    // 恢复原始数据
    this.loadTodayRecord()
  },

  onDelete() {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除今日的心情记录吗？',
      confirmColor: '#FF6B6B',
      success: (res) => {
        if (res.confirm && this.data.todayRecord) {
          const result = storageUtil.deleteRecord(this.data.todayRecord.id)
          if (result.success) {
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
            this.loadTodayRecord()
          }
        }
      }
    })
  }
})
