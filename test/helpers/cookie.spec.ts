import cookie from '../../src/helpers/cookie'

describe('helpers:cookie', () => {
  it('should read cookies', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('foo')).toBe('baz')
  })
  it('should return null if cookie nam is not exist', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('baz')).toBeNull()
  })
})
