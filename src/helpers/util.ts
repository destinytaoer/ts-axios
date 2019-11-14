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
  return toString.call(val) === '[Object object]'
}
