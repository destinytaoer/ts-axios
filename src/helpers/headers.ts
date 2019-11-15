import { isPlainObject } from './util'
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
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
