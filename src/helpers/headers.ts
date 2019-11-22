import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'
/**
 * normalizeHeaderName: 对 headers 中某个小写形式属性名, 转换为大写形式
 * @param headers
 * @param normalizedName
 */
function normalizeHeaderName(headers: any, normalizedName: string): any {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}
/**
 * processHeaders: 如果 data 是普通对象, 则对 headers 增加 Content-Type 的处理
 * @param headers
 * @param data
 */
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
/**
 * parseHeaders: 解析 responseHeaders 字符串为对象
 * @param headers
 */
export function parseHeaders(headers: string): any {
  // 这样创建对象, 当没有添加属性的时候, 就是 null 值
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, ...vals] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    const val = vals.join(':').trim()
    parsed[key] = val
  })
  return parsed
}
/**
 * flatttenHeaders: 将 headers 中的 common/post/get 等属性进行平铺成一级
 * @param headers
 * @param method
 */
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers

  // 合并需要的配置
  headers = deepMerge(headers.common, headers[method], headers)
  const methodsToDelete = ['get', 'post', 'put', 'delete', 'options', 'patch', 'head', 'common']

  // 删除多余的属性
  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
