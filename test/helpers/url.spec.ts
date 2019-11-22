import { buildURL, isAbsoluteURL, combineURL, isURLSameOrigin } from '../../src/helpers/url'

describe('helpers:url', () => {
  describe('buildURL', () => {
    it('should support null params', () => {
      expect(buildURL('/foo')).toBe('/foo')
    })
    it('should support params', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar'
        })
      ).toBe('/foo?foo=bar')
    })
    it('should ignore if some param value is null', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar',
          bar: null
        })
      ).toBe('/foo?foo=bar')
    })
    it('should ignore if the only param value is null', () => {
      expect(
        buildURL('/foo', {
          bar: null
        })
      ).toBe('/foo')
    })
    it('should support object params', () => {
      expect(
        buildURL('/foo', {
          foo: {
            bar: 'baz'
          }
        })
      ).toBe('/foo?foo=' + encodeURI('{"bar":"baz"}'))
    })
    it('should support date params', () => {
      const date = new Date()

      expect(
        buildURL('/foo', {
          date: date
        })
      ).toBe('/foo?date=' + date.toISOString())
    })
    it('should support array params', () => {
      expect(
        buildURL('/foo', {
          foo: ['bar', 'baz']
        })
      ).toBe('/foo?foo[]=bar&foo[]=baz')
    })
    it('should support special char params', () => {
      expect(
        buildURL('/foo', {
          foo: '@:$, '
        })
      ).toBe('/foo?foo=@:$,+')
    })
    it('should support existing params', () => {
      expect(
        buildURL('/foo?foo=bar', {
          bar: 'baz'
        })
      ).toBe('/foo?foo=bar&bar=baz')
    })
    it('should correct discard url hash mark', () => {
      expect(
        buildURL('/foo?foo=bar#hash', {
          bar: 'baz'
        })
      ).toBe('/foo?foo=bar&bar=baz')
    })
    it('should use custom serializer if provided', () => {
      const serializer = jest.fn(() => {
        return 'foo=bar'
      })
      const params = { foo: 'baz' }
      expect(buildURL('/foo', params, serializer)).toBe('/foo?foo=bar')
      expect(serializer).toBeCalled()
      expect(serializer).toBeCalledWith(params)
    })
    it('should support URLSearchParam', () => {
      expect(buildURL('/foo', new URLSearchParams('foo=bar&bar=baz'))).toBe('/foo?foo=bar&bar=baz')
    })
  })
  describe('isAbsoluteURL', () => {
    it('should return true if URL begins with valid scheme name', () => {
      expect(isAbsoluteURL('https://baidu.com')).toBeTruthy()
      expect(isAbsoluteURL('custon-schema://baidu.com')).toBeTruthy()
      expect(isAbsoluteURL('HTTP://baidu.com')).toBeTruthy()
    })
    it('should return false if URL begins with invalid scheme name', () => {
      expect(isAbsoluteURL('123://baidu.com')).toBeFalsy()
      expect(isAbsoluteURL('!invalid://baidu.com')).toBeFalsy()
    })
    it('should return true if URL is protocol-relative', () => {
      expect(isAbsoluteURL('//example.com')).toBeTruthy()
    })
    it('should return false if URL is relative', () => {
      expect(isAbsoluteURL('/foo')).toBeFalsy()
      expect(isAbsoluteURL('bar')).toBeFalsy()
    })
  })
  describe('combineURL', () => {
    it('should combine URL', () => {
      expect(combineURL('https://baidu.com', '/users')).toBe('https://baidu.com/users')
    })
    it('should remove duplicate slashes', () => {
      expect(combineURL('https://baidu.com/', '/users')).toBe('https://baidu.com/users')
    })
    it('should insert missing slash', () => {
      expect(combineURL('https://baidu.com', 'users')).toBe('https://baidu.com/users')
    })
    it('should not insert slash when relative url missing/empty', () => {
      expect(combineURL('https://baidu.com', '')).toBe('https://baidu.com')
    })
    it('should allow a single slash for relative url', () => {
      expect(combineURL('https://baidu.com/users', '/')).toBe('https://baidu.com/users/')
    })
  })
  describe('isURLSameOrigin', () => {
    it('should detect same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })
    it('should detect different origin', () => {
      expect(isURLSameOrigin('http://baidu.com')).toBeFalsy()
    })
  })
})
