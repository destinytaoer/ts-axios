import { AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)

  // 遍历 header 进行请求头设置
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLocaleLowerCase() === 'content-type') {
      // 如果 data 为 null, 设置 content-type 没有意义, 去掉这个头
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
