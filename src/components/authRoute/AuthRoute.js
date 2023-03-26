// 自己封装 AuthRoute路由鉴权高阶组件，实现未登录拦截，并跳转到登录页面；
// 思路：判断本地是否有token，若有就返回子组件，否则就重定向到登录页面；

// 高阶组件：把一个组件当成另一个组件的参数传入，然后通过一定的判断，返回新的组件；

import React from 'react'
import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"

export default function AuthRoute ({ children }) {
  const isToken = getToken()
  // 1.判断本地是否有token
  if (isToken) {
    // 2.若有就返回子组件
    return <>{children}</>
  } else {
    // 3.否则就重定向到登录页面
    return <Navigate to='/login' replace />
  }
}

// 示例：
// 路由鉴权写法：<AuthRoute><Layout /></AuthRoute>
// 若已登录，返回：<><Layout /></>
// 若未登录，返回：<Navigate to='/login' replace />
