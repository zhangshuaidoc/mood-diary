// utils/mood.js - 心情配置

const MOOD_TYPES = [
  { type: 'happy', emoji: '😊', name: '开心', color: '#FFD93D' },
  { type: 'calm', emoji: '😌', name: '平静', color: '#6BCB77' },
  { type: 'sad', emoji: '😢', name: '难过', color: '#4D96FF' },
  { type: 'angry', emoji: '😠', name: '生气', color: '#FF6B6B' },
  { type: 'anxious', emoji: '😰', name: '焦虑', color: '#C9B1FF' },
  { type: 'tired', emoji: '😫', name: '疲惫', color: '#B8B8B8' },
  { type: 'excited', emoji: '🤩', name: '兴奋', color: '#FF9F45' },
  { type: 'grateful', emoji: '🥰', name: '感恩', color: '#FF8BA7' }
]

/**
 * 根据类型获取心情配置
 */
function getMoodByType(type) {
  return MOOD_TYPES.find(m => m.type === type) || null
}

/**
 * 根据emoji获取心情配置
 */
function getMoodByEmoji(emoji) {
  return MOOD_TYPES.find(m => m.emoji === emoji) || null
}

/**
 * 获取所有心情类型
 */
function getAllMoods() {
  return MOOD_TYPES
}

module.exports = {
  MOOD_TYPES,
  getMoodByType,
  getMoodByEmoji,
  getAllMoods
}
