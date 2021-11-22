import modeType from './modeType'
export default {
  // 默认播放界面
  isFullScreen: false,
  // 迷你播放界面
  isShowMiniPlayer: false,
  // 列表播放器
  isShowListPlayer: false,
  // 图标/暂停/播放
  isPlaying: false,
  // 播放模式
  modeType: modeType.loop,
  // 保存歌曲详情
  songs: [],
  // 当前播放歌曲
  currentSong: {},
  currentIndex: 0,
  // 获取歌词
  currentLyric: {},
  // 进度条
  curTime: 0,
  // 收藏歌曲
  favoriteList: [],
  // 播放历史
  historyList: []
}
