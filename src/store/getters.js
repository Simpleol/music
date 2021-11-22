
export default {
  // 默认播放界面
  isFullScreen (state) {
    return state.isFullScreen
  },
  // 迷你播放界面
  isShowMiniPlayer (state) {
    return state.isShowMiniPlayer
  },
  // 列表播放器
  isShowListPlayer (state) {
    return state.isShowListPlayer
  },
  // 图标暂停/播放
  isPlaying (state) {
    return state.isPlaying
  },
  // 播放模式
  modeType (state) {
    return state.modeType
  },
  // 歌曲详情
  songs (state) {
    return state.songs
  },
  // 当前播放歌曲详情
  currentSong (state) {
    // 如果没有数据的话就添加默认数据
    let obj = {
      name: '',
      singer: '',
      picUrl: null
    }
    if (state.songs.length !== 0) {
      obj = state.songs[state.currentIndex]
    }
    return obj
    // 当前播放歌曲
  },
  // 歌词详情
  currentLyric (state) {
    return state.currentLyric
  },
  // 当前播放歌曲
  currentIndex (state) {
    return state.currentIndex
  },
  // 进度条
  curTime (state) {
    return state.curTime
  },
  // 收藏歌曲
  favoriteList (state) {
    return state.favoriteList
  },
  // 播放历史
  historyList (state) {
    return state.historyList
  }
}
