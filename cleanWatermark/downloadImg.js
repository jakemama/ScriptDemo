// 下载视频
const fs = require('fs')
const http = require('http')
const request = require('request')
const config = require('../config.json').cleanWatermark

function downloadImg(arr, title) {
  return new Promise((resolve, reject) => {
    arr.forEach((url, idx) => {
      let filename = `${config.savePath}/${title + idx}.jpeg`
      if (!fs.existsSync(filename)) {
        request({ url }).pipe(
          fs.createWriteStream(filename).on('close', (err) => {
            if (err) {
              console.log('写入失败', err)
            } else {
              console.log('下载成功', filename)
            }
          })
        )
      } else {
        console.log('已下载', filename)
      }
    })
    resolve('图片下载完成')
  })
}

module.exports = downloadImg
