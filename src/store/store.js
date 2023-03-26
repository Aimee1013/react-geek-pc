// Mobx管理store模块的模板写法

// 把所有的store模块做统一处理
// 导出一个统一的方法 useStore

import React from "react"
import LoginStore from "@/store/LoginStore"
import UserStore from "./UserStore"
import ChannelStore from "./ChannelStore"




class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.channelStore = new ChannelStore()
  }
}

// 实例化根store
// 导出useStore

const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)

export { useStore }
