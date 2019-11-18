// 缓存一个经常使用的方法, 可以优化性能以及减少代码
const toString = Object.prototype.toString

export function isDate(val: any): boolean {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): boolean {
  return val !== null && typeof val === 'object'
}
// 是否是普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// 深度合并多个对象
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
