import axios from '../../src/index'

// 404
axios({
  method: 'get',
  url: '/error/get1'
}).then(
  res => {
    console.log(res)
  },
  err => {
    console.log(err)
  }
)

// 正常请求, 可能 500 可能成功
axios({
  method: 'get',
  url: '/error/get'
}).then(
  res => {
    console.log(res)
  },
  err => {
    console.log(err)
  }
)

// 模拟网络错误, 5s 内控制台关闭网络, 请求就会得到网络错误
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then(
    res => {
      console.log(res)
    },
    err => {
      console.log(err)
    }
  )
}, 5000)

// 超时错误
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(
  res => {
    console.log(res)
  },
  err => {
    console.log(err)
  }
)
