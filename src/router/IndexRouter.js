// 路由懒加载写法
import React, { lazy, Suspense } from 'react'
import { history } from "@/utils/history"
import { unstable_HistoryRouter as HistoryRouter, BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthRoute from "@/components/authRoute/AuthRoute"

// import MyLayout from "@/pages/layout/MyLayout"
// import Login from "@/pages/login/Login"
// import Home from "@/pages/home/Home"
// import Article from "@/pages/article/Article"
// import Publish from "@/pages/publish/Publish"

// 按需导入路由组件
const Login = lazy(() => import('@/pages/login/Login'))
const MyLayout = lazy(() => import('@/pages/layout/MyLayout'))
const Home = lazy(() => import('@/pages/home/Home'))
const Article = lazy(() => import('@/pages/article/Article'))
const Publish = lazy(() => import('@/pages/publish/Publish'))




export default function IndexRouter () {
  return (
    <HistoryRouter history={history}>
      <Suspense
        fallback={
          <div style={{ textAlign: 'center', marginTop: 200 }}>
            loading...
          </div>}
      >
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
      </Suspense>
    </HistoryRouter>
  )
}
