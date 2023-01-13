const shareInfo = [
  '6.15 teo:/ 复制打开抖音，看看【GG没有Hadid的作品】对于法语一看就有过研究 # 搞笑# 留学生 # 海... https://v.douyin.com/km1yVmn/',
  '4.30 UYZ:/ 复制打开抖音，看看【战斗柔术  降伏摔跤的作品】这一锁，就是一辈子# 创作灵感 # 降伏摔跤 # ... https://v.douyin.com/kmPfgmp/',
  '7.12 EUl:/ 复制打开抖音，看看【MrYang杨家成🔥（中午12点直播）的作品】零基础到底怎么学英语？# 零基础学英语  https://v.douyin.com/kmPQkmF/',
]

function formatData(info) {
  let data = []
  console.log('开始格式化初始数据');
  let count = 0
  info.forEach(val => {
    let obj = {}
    const str = val.replace(/.*?【.*?】/, '')
    const match = str.split(/#/g)
    const len = match.length
    obj.id = count
    obj.title = match[0].trim()
    obj.url = match[len - 1].replace(/.*?https/, 'https')
    data.push(obj)
    count++
  });
  console.log('数据格式化完成');
  console.log(data);
  return data
}

module.exports = formatData(shareInfo)
