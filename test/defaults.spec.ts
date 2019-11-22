import axios, { AxiosTransformer, Axios } from '../src/index'
import { getAjaxRequest } from './helper'
import { deepMerge } from '../src/helpers/util'

describe('defaults', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('should transform request json', () => {
    expect(
      (axios.defaults.transformRequest as AxiosTransformer[])[0]({
        foo: 'bar'
      })
    ).toBe('{"foo":"bar"}')
  })
  it('should do nothing to request string', () => {
    expect((axios.defaults.transformRequest as AxiosTransformer[])[0]('foo=bar')).toBe('foo=bar')
  })
  it('should transform response json', () => {
    const data = (axios.defaults.transformResponse as AxiosTransformer[])[0]('{"foo":"bar"}')
    expect(typeof data).toBe('object')
    expect(data.foo).toBe('bar')
  })
  it('should do nothing to response string', () => {
    expect((axios.defaults.transformResponse as AxiosTransformer[])[0]('foo=bar')).toBe('foo=bar')
  })
  it('should use global defaults config', () => {
    axios('/foo')
    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })
  it('should use modified defaults config', () => {
    axios.defaults.baseURL = 'https://example.com/'
    axios('/foo')
    return getAjaxRequest().then(request => {
      expect(request.url).toBe('https://example.com/foo')
      delete axios.defaults.baseURL
    })
  })
  it('should use request config', () => {
    axios('/foo', {
      baseURL: 'https://examples.com'
    })
    return getAjaxRequest().then(request => {
      expect(request.url).toBe('https://examples.com/foo')
    })
  })
  it('should use default config for custom instance', () => {
    const instance = axios.create({
      xsrfCookieName: 'CUSTOM_XSRF_TOKEN',
      xsrfHeaderName: 'X_CUSTOM_XSRF_TOKEN'
    })
    document.cookie = instance.defaults.xsrfCookieName + '=foobarbaz'
    instance('/foo')
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[instance.defaults.xsrfHeaderName!]).toBe('foobarbaz')
      // 删掉 cookie, 防止影响其他用例
      document.cookie =
        instance.defaults.xsrfCookieName +
        '=;expire=' +
        new Date(Date.now() - 86400000).toUTCString()
    })
  })
  it('should use GET headers', () => {
    axios.defaults.headers.get['GET-CUSTOM-HEADER'] = 'foo'
    axios('/foo')
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['GET-CUSTOM-HEADER']).toBe('foo')
      delete axios.defaults.headers.get['GET-CUSTOM-HEADER']
    })
  })
  it('should use POST headers', () => {
    axios.defaults.headers.post['POST-CUSTOM-HEADER'] = 'foo'
    axios.post('/foo', {})
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['POST-CUSTOM-HEADER']).toBe('foo')
      delete axios.defaults.headers.post['POST-CUSTOM-HEADER']
    })
  })
  it('should use header config', () => {
    const instance = axios.create({
      headers: {
        common: {
          'X-COMMON-HEADER': 'commonHeaderValue'
        },
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        },
        post: {
          'X-POST-HEADER': 'postHeaderValue'
        }
      }
    })
    instance.get('/foo', {
      headers: {
        'X-FOO-HEADER': 'fooHeaderValue',
        'X-BAR-HEADER': 'barHeaderValue'
      }
    })
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders).toEqual(
        deepMerge(axios.defaults.headers.common, axios.defaults.headers.get, {
          'X-COMMON-HEADER': 'commonHeaderValue',
          'X-GET-HEADER': 'getHeaderValue',
          'X-FOO-HEADER': 'fooHeaderValue',
          'X-BAR-HEADER': 'barHeaderValue'
        })
      )
    })
  })
  it('should be used by custom instance if set before instance created', () => {
    axios.defaults.baseURL = 'https://examples.com'
    const instance = axios.create()

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('https://examples.com/foo')
      delete axios.defaults.baseURL
    })
  })
  it('should not be used by custom instance if set after instance created', () => {
    const instance = axios.create()
    axios.defaults.baseURL = 'https://examples.com'

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      delete axios.defaults.baseURL
    })
  })
})
