// pages/calendar/calendar.js
const dateUtil = require('../../utils/date.js')
const storageUtil = require('../../utils/storage.js')
const moodUtil = require('../../utils/mood.js')

Page({
  data: {
    year: 0,
    month: 0,
    calendarData: [],
    weekDays: ['日', '一', '二', '三', '四', '五', '六'],
    selectedDate: '',
    selectedRecord: null,
    showDetail: false
  },

  onLoad() {
    this.initCalendar()
  },

  onShow() {
    // 刷新日历数据
    this.loadCalendarData()
  },

  initCalendar() {
    const today = new Date()
    this.setData({
      year: today.getFullYear(),
      month: today.getMonth() + 1
    })
    this.loadCalendarData()
  },

  loadCalendarData() {
    const { year, month } = this.data
    let calendarData = dateUtil.generateCalendarData(year, month)
    const records = storageUtil.getMonthRecords(year, month)
    calendarData = storageUtil.mapRecordsToCalendar(calendarData, records)
    
    this.setData({
      calendarData,
      selectedDate: '',
      selectedRecord: null,
      showDetail: false
    })
  },

  onPrevMonth() {
    const { year, month } = dateUtil.getPrevMonth(this.data.year, this.data.month)
    this.setData({ year, month })
    this.loadCalendarData()
  },

  onNextMonth() {
    const { year, month } = dateUtil.getNextMonth(this.data.year, this.data.month)
    this.setData({ year, month })
    this.loadCalendarData()
  },

  onDayTap(e) {
    const { day } = e.currentTarget.dataset
    // 检查 day 是否存在且是当前月份
    if (!day || !day.isCurrentMonth) return
    
    // 格式化记录数据用于显示
    let selectedRecord = null
    if (day.record) {
      const moodInfo = moodUtil.getMoodByType(day.record.mood)
      selectedRecord = {
        ...day.record,
        moodName: moodInfo ? moodInfo.name : day.record.mood,
        createTimeStr: dateUtil.formatDateTime(day.record.createTime)
      }
    }
    
    this.setData({
      selectedDate: day.date,
      selectedRecord: selectedRecord,
      showDetail: !!selectedRecord
    })
  },

  onCloseDetail() {
    this.setData({
      showDetail: false
    })
  },

  onEditRecord() {
    const { selectedDate, selectedRecord } = this.data
    if (selectedRecord) {
      // 跳转到首页编辑
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },

  onDeleteRecord() {
    const { selectedRecord } = this.data
    if (!selectedRecord) return
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条心情记录吗？',
      confirmColor: '#FF6B6B',
      success: (res) => {
        if (res.confirm) {
          const result = storageUtil.deleteRecord(selectedRecord.id)
          if (result.success) {
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
            this.setData({
              showDetail: false,
              selectedRecord: null
            })
            this.loadCalendarData()
          }
        }
      }
    })
  },

  getMoodInfo(moodType) {
    return moodUtil.getMoodByType(moodType)
  }
})
