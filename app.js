// app.js
App({
  onLaunch() {
    // 初始化存储
    this.initStorage()
  },

  initStorage() {
    // 确保存储key存在
    const records = wx.getStorageSync('mood_records')
    if (!records) {
      wx.setStorageSync('mood_records', [])
    }
  },

  globalData: {
    userInfo: null,
    version: '1.0.0'
  }
})
