import { isDate, isPlainObject } from './util'

/**
 * encode: 实现对 URI 字符进行编码, 对部分编码的字符转换为原来的字符
 * @param val
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
/**
 * buildURL: 实现 get 请求时, 将 params 和 url 的拼接
 * @param url
 * @param params
 */
export function buildURL(url: string, params?: any): string {
  // 如果没有传递 params, 则不需要拼接, 直接返回即可
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 值为 null 或者 undefined, 则忽略它
    if (val === null || typeof val === 'undefined') {
      return
    }
    // 对值为数组的处理, 如果不是数组也将值放为数组中处理
    // 数组 params: aa: ['1', '2'] => ?aa[]=1&aa[]=2
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]' // 值为数组的 key 增加 []
    } else {
      values = [val]
    }
    values.forEach(val => {
      // 对值进行类型判断
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      } else {
        // 其他值不做任何处理
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  // 将所有键值对拼接起来
  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    // 存在 # 哈希, 则去掉哈希部分
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 将拼接好的参数放到 url 的后面
    // 存在问号说明已经有参数, 就使用 & 连接, 否则使用 ? 连接
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
