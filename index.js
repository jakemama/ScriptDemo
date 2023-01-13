const superagent = require("superagent"); //发送网络请求获取DOM
const cheerio = require("cheerio"); //能够像Jquery一样方便获取DOM节点
const puppeteer = require('puppeteer');
const config = require('./config.json').index

const url = config.url

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  try {
    console.log(`\n目前正在执行第${count}次重启，时间：${ new Date().toLocaleString() }`);

    console.log('superise motherFucker');
    
    let timeout = false
    const t = 5000
    await Promise.race([motherFucker(), sleep(t).then(() => {
      timeout = true
    })])

    if (timeout) {
      throw(`timeout ${t}`)
    }

  } catch (error) {
    console.error(`main error == ${error}`);
  }
}

async function motherFucker() {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
        // headless: false,
        timeout: 10000, // 默认超时为30秒，设置为0则表示不设置超时
      });

      // 打开空白页面
      const page = await browser.newPage();

      page.setViewport({
          width: 1376,
          height: 768,
      });

      await page.authenticate({'username':config.username, 'password': config.password});

      await page.goto(url, {
          // 配置项
          // waitUntil: 'networkidle', // 等待网络状态为空闲的时候才继续执行
      });

      let alist = await page.content()
      const btn = await page.$('input[name=BUTTON_RESTART_SHOW]');
      const value = await page.$eval('input[name=BUTTON_RESTART_SHOW]', input => input.value);
      page.tap('input[name=BUTTON_RESTART_SHOW]')
      console.log('已成功重启');
      // brower close前要等一段时间，不然会报错
      // UnhandledPromiseRejectionWarning: Error: Protocol error (Page.getLayoutMetrics): Target closed
      await sleep(1000);
      await browser.close()
      count++
      resolve('已成功重启')
      // console.log(alist, btn, value);
    } catch (error) {
      reject(error)
    }
  })
  
}


// 运行总时间，单位-分钟
const totalTime = 10
// 间隔时间， 单位-分钟
const spaceTime = 3
// 误差时间，单位-分钟
const randomTime = 0

let count = 1
console.log(`开始执行程序, 时间：${ new Date().toLocaleString() }\n`);
main()
setTimeout(() => {
  throw('\n任务结束，退出程序')
}, totalTime * 1000 * 60)

setInterval(async () => {
  await sleep(Math.random() * randomTime * 1000 * 60)
  main()
}, spaceTime * 1000 * 60)