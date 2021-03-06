import { AxiosRequestConfig, AxiosResponse } from '../types'
import { config } from 'shelljs'
export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  // 这个注释是为了跳过测试 constructor
  /* istanbul ignore next */
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // 修复继承内置类导致的 bug
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
