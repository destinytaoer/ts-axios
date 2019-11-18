import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  // instance 是一个函数, 需要包含 get/post 等方法, 但是 Axios 中定义的 get 等方法需要用到 this, 所以需要 bind 这个 context, 否则 this 会是 request 函数本身
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
