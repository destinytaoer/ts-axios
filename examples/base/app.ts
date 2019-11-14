import axios from '../../src/index'

/**
 * params 配置检查
 */
// 参数是普通值
axios({
  method: 'get',
  url: '/base/get',
  params: {
    a: 1,
    b: 2
  }
})

// 参数是数组
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

// 参数是对象
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// 参数是 Date 类型
const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

// 参数中包含一些特殊字符, 不被编码
// 字符 @、:、$、,、、[、], 允许出现在 url 中的, 不被 encode
// 其中 空格被设置为 +
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

// 空值忽略
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

// 丢弃 url 中的哈希标记
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

// 保留 url 中已存在的参数
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})

/**
 * data 配置检查
 */
// data 是一个普通对象
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

// data 是一个 Int32Array
const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})
