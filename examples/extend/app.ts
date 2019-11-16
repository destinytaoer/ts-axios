import axios from '../../src/index'

// axios 发送请求
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})
// 支持两个参数
axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hi'
  }
})

// 利用 axios.request 方法发送请求, 本质上与 axios 方法一致
axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})
// 支持两个参数
axios.request('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})

// axios.get
axios.get('/extend/get')
// axios.options
axios.options('/extend/options')
// axios.delete
axios.delete('/extend/delete')
// axios.head
axios.head('/extend/head')

// axios.post
axios.post('/extend/post', { msg: 'post' })
// axios.put
axios.put('/extend/put', { msg: 'put' })
// axios.patch
axios.patch('/extend/patch', { msg: 'patch' })
