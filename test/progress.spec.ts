import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('should add a download progress handler', () => {
    const progressSpy = jest.fn()

    axios('/foo', {
      onDownloadProgress: progressSpy
    })

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })
      expect(progressSpy).toBeCalled()
    })
  })
  it('should add an upload progress handler', () => {
    const progressSpy = jest.fn()

    axios('/foo', {
      onUploadProgress: progressSpy
    })

    return getAjaxRequest().then(request => {
      // Jasmine Ajax 没有派发 upload 事件的功能, 等待 jest-ajax 来修复
      // expect(progressSpy).toBeCalled()
    })
  })
})
