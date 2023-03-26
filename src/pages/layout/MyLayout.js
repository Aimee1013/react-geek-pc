import React, { useEffect } from 'react'
import styles from './MyLayout.module.scss'
import logoSrc from '@/assets/logo.png'
import { Layout, Menu, Button, Popconfirm, message } from 'antd';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import {
  LoginOutlined,
  PieChartOutlined,
  CopyOutlined,
  EditOutlined,
} from '@ant-design/icons';

import { useStore } from "@/store/Store";

const { Header, Sider } = Layout;

function MyLayout () {
  // 获取当前激活的path路径，来设置左侧菜单的动态高亮
  const location = useLocation()
  // console.log(location.pathname)

  // 获取用户信息
  const { userStore, loginStore, channelStore } = useStore()
  useEffect(() => {
    userStore.getUserInfo()
    channelStore.getChannel()
  }, [userStore, channelStore])

  // 确认退出
  const navigate = useNavigate()
  const confirmLogout = () => {
    // 退出登录时，需要删除token数据 + 跳回到登录页
    // 调用清除token的方法
    loginStore.logout()

    // 跳回到登录页
    navigate('/login')
  }

  return (
    <Layout className={styles['layout']} style={{ height: '100vh' }}>
      <Header className="header">
        <div className="logo" style={{ marginLeft: '-20px' }}>
          <img src={logoSrc} alt="" style={{ height: '36px', marginTop: '36px' }} />
        </div>
        <div className="profile">
          <span style={{ color: 'white' }}>{userStore.userInfo.name}</span>
          <Popconfirm
            placement="bottom"
            title="是否确定退出？"
            onConfirm={confirmLogout}
            okText="确认"
            cancelText="取消"
          >
            <Button
              type="text"
              style={{ color: '#fff' }}
              icon={<LoginOutlined />}
            >
              退出
            </Button>
          </Popconfirm>
        </div>
      </Header>
      <Layout style={{ height: 'calc(100vh-64px)' }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={location.pathname} //设置高亮对应的菜单,通过路由控制，设置key--获取当前激活的path路径
            selectedKeys={location.pathname}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="/" icon={<PieChartOutlined />}>
              <Link to="/">数据概况</Link>
            </Menu.Item>

            <Menu.Item key="/article" icon={<CopyOutlined />}>
              <Link to="/article">内容管理</Link>
            </Menu.Item>

            <Menu.Item key="/publish" icon={<EditOutlined />}>
              <Link to="/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(MyLayout)


