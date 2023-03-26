import { makeAutoObservable } from 'mobx'
import { http } from '@/utils/http'


class ChannelStore {
  // 初始化用户信息
  channelInfo = []

  constructor() {
    makeAutoObservable(this)
  }

  // 调用接口获取用户信息
  getChannel = async () => {
    const res = await http.get('/channels')
    console.log('getChannel', res.data)
    this.channelInfo = res.data.channels
  }
}

export default ChannelStore