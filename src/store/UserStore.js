import { makeAutoObservable } from 'mobx'
import { http } from '@/utils/http'


class UserStore {
  // 初始化用户信息
  userInfo = {}

  constructor() {
    makeAutoObservable(this)
  }

  // 调用接口获取用户信息
  getUserInfo = async () => {
    const res = await http.get('/user/profile')
    // console.log(res)
    this.userInfo = res.data
  }
}

export default UserStore