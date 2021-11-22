import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_LIST_PLAYER,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
} from './mutations-type'
export default {
  // 默认播放界面
  [SET_FULL_SCREEN] (state, flag) {
    state.isFullScreen = flag
    if (flag) {
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
    }
  },
  // 迷你播放界面
  [SET_MINI_PLAYER] (state, flag) {
    state.isShowMiniPlayer = flag
    if (flag) {
      state.isFullScreen = false
      state.isShowListPlayer = false
    }
  },
  // 列表播放器
  [SET_LIST_PLAYER] (state, flag) {
    state.isShowListPlayer = flag
  },
  // 图标暂停/播放
  [SET_IS_PLAYING] (state, flag) {
    state.isPlaying = flag
  },
  // 播放模式
  [SET_MODE_TYPE] (state, flag) {
    state.modeType = flag
  },
  // 歌曲详情
  [SET_SONG_DETAIL] (state, list) {
    state.songs = list
  },
  // 歌词详情
  [SET_SONG_LYRIC] (state, lyric) {
    state.currentLyric = lyric
  },
  // 删除歌曲
  [SET_DEL_SONG] (state, index) {
    if (index !== undefined) {
      // 如果传了index就删除一个
      state.songs.splice(index, 1)
    } else {
      // 如果没有传就清空
      state.songs = []
    }
    if (index < state.currentIndex) {
      state.currentIndex = state.currentIndex - 1
    }
    // 如果没有歌曲了
    if (state.songs.length === 0) {
      // 隐藏默认播放界面
      state.isFullScreen = false
      // 隐藏迷你播放界面
      state.isShowMiniPlayer = false
      // 隐藏列表播放界面
      state.isShowListPlayer = false
    }
  },
  // 切换歌曲
  [SET_CURRENT_INDEX] (state, index) {
    // 如果小于0就切换最后一首
    if (index < 0) {
      index = state.songs.length - 1
      // 如果大于最后一首就切换第一首
    } else if (index > state.songs.length - 1) {
      index = 0
    }
    state.currentIndex = index
  },
  // 歌曲详情
  [SET_CURRENT_TIME] (state, time) {
    state.curTime = time
  },
  // 收藏歌曲
  [SET_FAVORITE_SONG] (state, song) {
    // 查找是否已经有了重复歌曲
    let result = state.favoriteList.find(function (currentValue) {
      return currentValue.id === song.id
    })
    // 没有的话就添加
    if (result === undefined) {
      state.favoriteList.push(song)
    }
  },
  [SET_FAVORITE_LIST] (state, list) {
    state.favoriteList = list
  },
  // 播放历史
  [SET_HISTORY_SONG] (state, song) {
    // 查找是否已经有了重复歌曲
    let result = state.historyList.find(function (currentValue) {
      return currentValue.id === song.id
    })
    // 没有的话就添加
    if (result === undefined) {
      // 如果播放历史歌曲已经超过30首将删除一个
      if (state.historyList.length > 30) {
        state.historyList.splice(0, 1)
      }
      state.historyList.push(song)
    }
  },
  [SET_HISTORY_LIST] (state, list) {
    state.historyList = list
  }
}
