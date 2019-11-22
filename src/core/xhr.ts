import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'
import cookie from '../helpers/cookie'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config
    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()
    addEvents()
    processHeaders()
    processCancel()

    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) return

        // 网络错误或者超时错误, status 都为 0, 这两个错误在监听事件中处理
        if (request.status === 0) return

        // 获取到的是一个字符串
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData = responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        handleResponse(response)
      }

      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }

      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED'))
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      // 如果是 FormData, 即上传文件的情况, 让浏览器自行设置其 Content-Type 为 multipart/xxxx; boundary=xxx
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        // Authorization: <type> <credentials>
        // credentials 是 username:password 通过 base64 加密后的字符串
        // btoa 是 base64 加密函数
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      // 遍历 header 进行请求头设置
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLocaleLowerCase() === 'content-type') {
          // 如果 data 为 null, 设置 content-type 没有意义, 去掉这个头
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
