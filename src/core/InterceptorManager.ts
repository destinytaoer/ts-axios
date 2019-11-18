import { ResolvedFn, RejectedFn } from '../types'
import { threadId } from 'worker_threads'
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}
export default class InterceptorManager<T> {
  private interceptors: (Interceptor<T> | null)[]

  constructor() {
    this.interceptors = []
  }
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    // 返回其索引作为 id
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void) {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
