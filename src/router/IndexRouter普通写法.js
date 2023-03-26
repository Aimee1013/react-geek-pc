import React from 'react'
import { unstable_HistoryRouter as HistoryRouter, BrowserRouter, Routes, Route } from 'react-router-dom'
import MyLayout from "@/pages/layout/MyLayout"
import Login from "@/pages/login/Login"
import AuthRoute from "@/components/authRoute/AuthRoute"
import Home from "@/pages/home/Home"
import Article from "@/pages/article/Article"
import Publish from "@/pages/publish/Publish"

import { history } from "@/utils/history"


export default function IndexRouter () {
  return (
    <HistoryRouter history={history}>
      {/* 一级路由 */}
      <Routes>
        {/* layout组件需要鉴权处理 */}
        <Route path='/' element={<AuthRoute><MyLayout /></AuthRoute>}>
          {/* 二级路由 */}
          <Route index element={<Home />}></Route>
          <Route path='/article' element={<Article />}></Route>
          <Route path='/publish' element={<Publish />}></Route>
        </Route>

        {/* login组件是不需要鉴权处理的 */}
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </HistoryRouter>
  )
}
