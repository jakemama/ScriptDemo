const superagent = require('superagent') //发送网络请求获取DOM
const cheerio = require('cheerio') //能够像Jquery一样方便获取DOM节点
const puppeteer = require('puppeteer')

const shareData = require('./shareData')

const downloadVideo = require('./downloadVideo.js')

function sleep(s) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000))
}

async function main() {
  try {
    console.log('main function: start clean watermark program')

    const browser = await puppeteer.launch({
      // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
      headless: false,
      timeout: 10000, // 默认超时为30秒，设置为0则表示不设置超时
    })

    // 打开空白页面
    const page = await browser.newPage()

    await page.setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
    )
    await page.setViewport({ width: 375, height: 812 })

    await loop(page, shareData)

    // brower close前要等一段时间，不然会报错
    // UnhandledPromiseRejectionWarning: Error: Protocol error (Page.getLayoutMetrics): Target closed
    await sleep(1)
    await browser.close()
  } catch (error) {
    console.error(`main error == ${error}`)
  }
}

async function loop(page, shareData) {
  return new Promise(async (resolve, reject) => {
    try {
      for (let index = 0; index < shareData.length; index++) {
        const obj = shareData[index]

        console.log(
          `\n目前正在执行第${count}次处理，时间：${new Date().toLocaleString()}`
        )

        await page.goto(obj.url, {
          // 配置项
          // waitUntil: 'networkidle', // 等待网络状态为空闲的时候才继续执行
        })

        // 手动处理滑动验证码
        if (obj.id === 0) {
          await sleep(15)
        }

        // 获取无水印视频地址
        const wmVideo = await page.$eval('.video-player', function (el) {
          return el.getAttribute('src')
        })
        // console.log('wmVideo:', wmVideo)

        const video_url =
          'https://aweme.snssdk.com' + wmVideo.replace('playwm', 'play')
        // console.log('video_url:', video_url)

        await page.goto(video_url, {})
        const src = await page.$eval('source', function (el) {
          return el.getAttribute('src')
        })
        console.log('video_src:', src)

        console.log('downloading video ......');

        // 视频下载
        const param = {
          title: obj.title,
          url: src.replace('https', 'http'),
        }
        await downloadVideo(param)

        count++
      }
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

let count = 1
console.log(`开始执行程序, 时间：${new Date().toLocaleString()}\n`)
main()
