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
// 导入api
import { getSongDetail, getSongLyric, getSongUrl } from '../api/index'
export default {
  // 默认播放界面
  setFullScreen ({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  // 迷你播放界面
  setMiniPlayer ({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  // 列表播放界面
  setListPlayer ({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  // 图标暂停/播放
  setIsPlaying ({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  // 播放模式
  setModeType ({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  // 歌曲详情
  async setSongDetail ({ commit }, ids) {
    let result = await getSongDetail({ ids: ids.join(',') })
    let urls = await getSongUrl({ id: ids.join(',') })
    // console.log(urls)
    // console.log(result)
    let list = []
    result.songs.forEach(function (value, i) {
      let obj = {}
      // obj.url = urls.data[i].url
      // 解决歌词不对版问题
      for (let j = 0; j < urls.data.length; j++) {
        let item = urls.data[j]
        if (value.id === item.id) {
          obj.url = item.url
          break
        }
      }
      obj.id = value.id
      obj.name = value.name
      let singer = ''
      value.ar.forEach(function (item, index) {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '-' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = value.al.picUrl
      list.push(obj)
    })
    commit(SET_SONG_DETAIL, list)
  },
  // 歌词详情
  async setSongLyric ({ commit }, id) {
    let result = await getSongLyric({ id: id })
    // console.log(result.lrc.lyric)
    // 将歌词格式化
    let obj = parseLyric(result.lrc.lyric)
    // console.log(obj)
    commit(SET_SONG_LYRIC, obj)
  },
  // 删除歌曲
  setDelSong ({ commit }, index) {
    commit(SET_DEL_SONG, index)
  },
  // 切换歌曲
  setCurrentIndex ({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  // 进度条
  setCurrentTime ({ commit }, time) {
    commit(SET_CURRENT_TIME, time)
  },
  // 收藏歌曲
  setFavoriteSong ({ commit }, song) {
    commit(SET_FAVORITE_SONG, song)
  },
  setFavoriteList ({ commit }, list) {
    commit(SET_FAVORITE_LIST, list)
  },
  // 播放历史
  setHistorySong ({ commit }, song) {
    commit(SET_HISTORY_SONG, song)
  },
  setHistoryList ({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  }
}

// 格式化歌词
function parseLyric (lrc) {
  let lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  let reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  let reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  let lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    let minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    let secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    let time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    let text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
