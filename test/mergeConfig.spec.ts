import axios from '../src/index'
import mergeConfig from '../src/core/mergeConfig'
import { merge } from 'rxjs'

describe('mergeConfig', () => {
  const defaults = axios.defaults

  it('should accept undefined for second argument', () => {
    expect(mergeConfig(defaults, undefined)).toEqual(defaults)
  })
  it('should accept an object for second argument', () => {
    expect(mergeConfig(defaults, {})).toEqual(defaults)
  })
  it('should not leave references', () => {
    const merged = mergeConfig(defaults, {})
    expect(merged).not.toBe(defaults)
    expect(merged.headers).not.toBe(defaults.headers)
  })
  it('should allow setting request options', () => {
    const config = {
      url: '__sample url__',
      params: '__sample params__',
      data: { foo: true }
    }
    const merged = mergeConfig(defaults, config)
    expect(merged.url).toBe(config.url)
    expect(merged.params).toBe(config.params)
    expect(merged.data).toEqual(config.data)
  })
  it('should not inherit request options', () => {
    // 对于 url, params, data, 无条件使用 config2 的值
    // 因为在 axios 的默认配置中, 是没有这些属性的
    const localDefaults = {
      url: '__sample url__',
      params: '__sample params__',
      data: { foo: true }
    }
    const merged = mergeConfig(localDefaults, {})
    expect(merged.url).toBeUndefined()
    expect(merged.params).toBeUndefined()
    expect(merged.data).toBeUndefined()
  })
  it('should return default headers if pass config2 with undefined', () => {
    expect(
      mergeConfig(
        {
          headers: 'x-mock-header'
        },
        undefined
      )
    ).toEqual({
      headers: 'x-mock-header'
    })
  })
  it('should merge auth, headers with defaults', () => {
    // 对于 auth, headers 是使用 deepMerge
    expect(
      mergeConfig(
        {
          auth: undefined
        },
        {
          auth: {
            username: 'foo',
            password: 'test'
          }
        }
      )
    ).toEqual({
      auth: {
        username: 'foo',
        password: 'test'
      }
    })
    expect(
      mergeConfig(
        {
          auth: {
            username: 'foo',
            password: 'test'
          }
        },
        {
          auth: {
            username: 'baz',
            password: 'foobar'
          }
        }
      )
    ).toEqual({
      auth: {
        username: 'baz',
        password: 'foobar'
      }
    })
  })
  it('should overwrite auth, headers with null ', () => {
    expect(
      mergeConfig(
        {
          headers: {
            common: {
              Accept: 'application/json'
            }
          }
        },
        {
          headers: null
        }
      )
    ).toEqual({
      headers: null
    })
  })
  it('should allow setting other options', () => {
    const merged = mergeConfig(defaults, {
      timeout: 100
    })
    expect(merged.timeout).toBe(100)
  })
})
