import axios from '../src/index'
import { getAjaxRequest } from './helper'
import { request } from 'http'

describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('should accept HTTP Basic auth with username/password', () => {
    axios('/foo', {
      auth: {
        username: 'Aladdin',
        password: 'open sesame'
      }
    })
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Authorization']).toBe('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==')
    })
  })
  it('should fail to encode HTTP Basic auth credentials with non-Latin1 characters', () => {
    return axios('/foo', {
      auth: {
        username: 'Aladßç£☃din',
        password: 'open sesame'
      }
    })
      .then(() => {
        throw new Error(
          'sohuld not successed to make a HTTP Basic auth request with non-Latin1 chars in credentials.'
        )
      })
      .catch(error => {
        expect(/character/i.test(error.message)).toBeTruthy()
      })
  })
})
