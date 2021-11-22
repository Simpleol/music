// 导入封装好的api文件
import Network from './network'

// 专门用于管理请求各种接口地址的
export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized?limit=6')
export const getNewAlbum = () => Network.get('album/newest')
export const getNewSong = () => Network.get('personalized/newsong')
export const getPlayerList = (id) => Network.get('playlist/detail', id)
export const getAlbum = (id) => Network.get('album', id)
export const getSongDetail = (ids) => Network.get('song/detail', ids)
export const getSongLyric = (id) => Network.get('lyric', id)
export const getSongUrl = (id) => Network.get('song/url', id)
export const getHotArtists = () => {
  return new Promise(function (resolve, reject) {
    Network.get('top/artists?offset=0&limit=5')
      .then(function (result) {
        resolve(result.artists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getLetterArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    let lettersArtists = []
    Network.all([
      Network.get(`artist/list?offset=0&limit=10&type=1&area=-1&initial=${letter}`)
    ])
      .then(function (result) {
        // resolve(result)
        result.forEach(function (item) {
          lettersArtists.push(...item.artists)
        })
        // console.log(lettersArtists)
        resolve(lettersArtists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getAllArtists = () => {
  return new Promise(function (resolve, reject) {
    let keys = ['热']
    let list = [getHotArtists()]
    for (let i = 65; i < 91; i++) {
      // 将数字转换成字母
      let char = String.fromCharCode(i)
      // console.log(char)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    // console.log(keys)
    Network.all(list)
      .then(function (result) {
        // console.log(result)
        let obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getArtistsSongs = (id) => Network.get('/artists', id)
export const getTopListDetail = () => Network.get('toplist/detail')
export const getSearchList = (keywords) => Network.get('/search?type=1', keywords)
export const getSearchHot = () => Network.get('search/hot')
