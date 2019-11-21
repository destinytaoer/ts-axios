# ts-axios

使用 TypeScript 重构 axios 库

本项目主要是为了学习 axios 和 typescript。相关慕课网课程地址: [基于 TypeScript 从零重构 axios](https://coding.imooc.com/class/330.html)

> ps: 盗版视频可以在 B 站进行搜索，仍然希望大家能够支持正版，正版会具有后续的更新和视频的补充。

## 功能实现

- 基础功能
  - 实现 xhr 请求
  - 处理请求 params 参数
  - 处理请求体 body 数据
  - 处理请求 header
  - 获取响应数据
  - 处理响应数据 data
  - 处理响应 header
- 错误处理
- 接口拓展：get/post 等接口
- 实现拦截器
- 增加默认配置
- transformRequest 和 transformResponse  可配置化
- create 方法创建新的 axios 实例
- 取消功能
- 拓展功能
  - withCredentials 配置
  - XSRF 防御
  - 上传和下载的进度监控
  - HTTP Authorization
  - 自定义参数序列化
  - 自定义合法状态码
  - baseURL 配置
  - 方法拓展：axios.all、axios.spread、axios.getUri

## 文档

[文档](https://destinytaoer.github.io/ts-axios/)是搭配视频学习的课件，由[黄奕](https://github.com/ustbhuangyi)老师提供。
