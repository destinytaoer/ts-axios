import { AxiosStatic, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // instance 是一个函数, 需要包含 get/post 等方法, 但是 Axios 中定义的 get 等方法需要用到 this, 所以需要 bind 这个 context, 否则 this 会是 request 函数本身
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config: AxiosRequestConfig): AxiosStatic {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
