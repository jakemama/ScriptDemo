const shareInfo = ''

function formatData(info) {
  const arr = info.split('=')
  let data = [];
  console.log("开始格式化初始数据");
  let count = 0;
  arr.forEach((val) => {
    let obj = {};
    const str = val.replace(/.*?【.*?】/, "");
    const match = str.split(/#/g);
    const len = match.length;
    obj.id = count;
    obj.title = match[0].trim();
    obj.url = match[len - 1].replace(/.*?https/, "https");
    data.push(obj);
    count++;
  });
  console.log("数据格式化完成");
  console.log(data);
  return data;
}

module.exports = formatData(shareInfo);
