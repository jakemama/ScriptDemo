const Axios = require('axios')
const config = require('../config.json').yang
const token = config.token

const repeat_time = 5000
const request_header = {
  Host: 'cat-match.easygame2021.com',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.33',
  t: token,
}
let success_num = 0
async function run() {
  const time = Math.floor(Math.random() * (3600 - 1 + 1)) + 1
  await Axios.get(
    `https://cat-match.easygame2021.com/sheep/v1/game/game_over?rank_score=1&rank_state=1&rank_time=${time}&rank_role=1&skin=1`,
    {
      headers: request_header,
      timeout: 10000,
    }
  )
    .then((res) => {
      if (res.data.err_code == 0) {
        console.log(`成功${++success_num}次`)
      } else {
        console.log(`服务器错误`)
      }
    })
    .catch((e) => {
      console.log('失败')
    })
}
;(async function () {
  for (let i = 0; i < repeat_time; ++i) {
    await run()
  }
})()
