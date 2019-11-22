import { isDate, isPlainObject, isURLSearchParams } from './util'

interface URLOrigin {
  protocol: string
  host: string
}

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
export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  // 如果没有传递 params, 则不需要拼接, 直接返回即可
  if (!params) {
    return url
  }

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
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
    serializedParams = parts.join('&')
  }

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

/**
 * isAbsoluteURL: 判断 url 是否是一个绝对地址
 * @param url
 */
export function isAbsoluteURL(url: string): boolean {
  // 匹配 xxx:// 或者 // 开头
  return /^([a-z][a-z\d+\-\.]*:)?\/\//i.test(url)
}

/**
 * combineURL: 拼接 baseURL 和 relativeURL
 * @param baseURL
 * @param relativeURL
 */
export function combineURL(baseURL: string, relativeURL?: string): string {
  // 拼接时, 需要去掉 baseURL 末尾的 / 以及 relativeURL 开头的 /, 防止出现多个 /
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

/**
 * isURLSameOrigin: 判断请求 url 是否与当前的 host 是同源的
 * @param requestURL
 */
export function isURLSameOrigin(requestURL: string): boolean {
  const parseOrigin = resolveURL(requestURL)
  return parseOrigin.protocol === curOrigin.protocol && parseOrigin.host === curOrigin.host
}

const urlParsingNode = document.createElement('a')
const curOrigin = resolveURL(window.location.href)
/**
 * resolveURL: 解析 url, 获取其 protocol 和 host
 * 创建 a 标签, 添加属性 href 为 url, 通过这个 a 标签元素即可获取到 protocol 和 host
 * @param url
 */
function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}
