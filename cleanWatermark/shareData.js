const shareInfo =
  '4.66 tRx:/ 复制打开抖音，看看【佳有两个颖宝【孕晚期】的图文作品】卸货前，你家老公这些技能都学会了吗? # 准妈妈#... https://v.douyin.com/BMSFBSS/==1.05 SLw:/ 复制打开抖音，看看【人民网福建的作品】快转发给你的“胖友”！肚子肉越多，脑子可能越笨# ... https://v.douyin.com/knEEPX6/==5.69 jpD:/ 复制打开抖音，看看【智慧育儿推荐官的作品】新生儿出生后你必须知道的10件事# 新生儿# 新手... https://v.douyin.com/B67NX1d/==1.28 FuS:/ 复制打开抖音，看看【儿科姜主任的作品】宝宝满嘴溃疡，可能是因为这个原因！# 育儿 # 母... https://v.douyin.com/B6WE7Uj/==4.33 nqE:/ 复制打开抖音，看看【育儿知识每日学的作品】为什么要戒夜奶？最后一点危害大# 母婴育儿 # 育... https://v.douyin.com/B67kDG3/==适合0-6月龄宝宝的婴儿操：排气操、抚触操、被动操，下载看更多 https://v.douyin.com/B6Woghe/ 复制此链接，打开【抖音短视频】，直接观看视频！==5.84 wfB:/ 复制打开抖音，看看【年糕妈妈的作品】娃崩溃大哭，打骂是最没用的！什么是有效安慰？试着当... https://v.douyin.com/B67eHVT/==1.74 xSl:/ 复制打开抖音，看看【育儿教授魏老爸的作品】孕妈除了要保护肚子，这几个部位也要注意保护# 怀孕... https://v.douyin.com/B67r4yb/==5.87 ZZM:/ 复制打开抖音，看看【育儿教授魏老爸的作品】新生儿一定要采足跟血# 母婴育儿 # 新生儿  https://v.douyin.com/B6719sc/==0.76 kPK:/ 复制打开抖音，看看【奶粉知识的作品】从怀孕到生娃可以领到哪些补贴？# 母婴 # 新手爸... https://v.douyin.com/B6WnsH3/==5.12 zGi:/ 复制打开抖音，看看【育儿教授魏老爸的作品】当你老公问你怎么还不睡时？# 孕期 # 准妈妈 #... https://v.douyin.com/B6WWxwG/==3.35 reO:/ 复制打开抖音，看看【爷爷来啦！程大夫谈育儿的作品】奶后为何不需要拍嗝？# 育儿 # 宝妈 # 宝宝 ... https://v.douyin.com/B6Wpaxk/==0.05 dNW:/ 复制打开抖音，看看【育儿教授魏老爸的作品】如何培养宝宝睡整夜觉# 母婴育儿 # 关注我每天分... https://v.douyin.com/B6W47M5/'
function formatData(info) {
  const arr = info.split('==')
  let data = []
  console.log('开始格式化初始数据')
  let count = 0
  arr.forEach((val) => {
    let obj = {}
    const str = val.replace(/.*?【.*】/, '')
    const match = str.split(/#/g)
    const len = match.length
    obj.id = count
    obj.title = match[0].trim()
    obj.url = match[len - 1].replace(/.*?https/, 'https')
    if (/https/.test(obj.title)) {
      obj.title = obj.title.replace(obj.url, '').replace(/“|”/g, '').trim()
    }
    data.push(obj)
    count++
  })
  console.log('数据格式化完成')
  console.log(data)
  return data
}

module.exports = formatData(shareInfo)
