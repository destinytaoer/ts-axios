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

// 测试响应数据泛型
// 定义响应泛型接口
interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}
// 定义 result 部分的接口类型
interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.log(err))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}
test()
