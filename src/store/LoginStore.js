// 登录模块
import { makeAutoObservable } from 'mobx'
import { http, setToken, getToken, removeToken } from '@/utils'


class LoginStore {
  // 初始化时从本地取token，取不到即为''
  token = getToken() || ''

  constructor() {
    makeAutoObservable(this)
  }

  // 登录
  login = async ({ mobile, code }) => {
    // 调用登录接口
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    console.log('login', res)

    // 存入token到内存
    this.token = res.data.token

    // 存入token到localStorage使其存储持久化
    setToken(res.data.token)
  }

  // 退出登录
  logout = () => {
    // 清除初始化数据
    this.getToken = ''
    // 清除本地token
    removeToken()
  }
}

export default LoginStore