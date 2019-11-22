import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('xsrf', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
    document.cookie =
      axios.defaults.xsrfCookieName + '=;expires=' + new Date(Date.now() - 86400000).toUTCString()
  })

  it('should not set xsrf header if cookie is null', () => {
    axios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })
  it('should set xsrf header if cookie is set', () => {
    document.cookie = axios.defaults.xsrfCookieName + '=1234'
    axios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBe('1234')
    })
  })
  it('should not set xsrf header for cross origin', () => {
    document.cookie = axios.defaults.xsrfCookieName + '=1234'
    axios('https://examples.com')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })
  it('should set xsrf header for cross origin when using withCredentials', () => {
    document.cookie = axios.defaults.xsrfCookieName + '=1234'
    axios('https://examples.com', {
      withCredentials: true
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBe('1234')
    })
  })
})
