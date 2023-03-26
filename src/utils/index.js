// 先把所有的工具函数导出的模块导入到utils/index.js文件中，然后再统一导出

import { http } from './http'
import { setToken, getToken, removeToken } from './token'

export { http, setToken, getToken, removeToken }