import React from 'react'
import styles from '@/pages/login/Login.module.scss'
import imgSrc from '@/assets/logo.png'
import { Card, Form, Input, Button, Checkbox, message } from 'antd'

import { useStore } from "@/store/Store"
import { useNavigate } from "react-router-dom"


export default function Login () {
  //解构实例对象loginStore 
  const { loginStore } = useStore()
  const navigate = useNavigate()

  // 提交表单事件
  const onFinish = async (values) => {
    console.log('suc', values)
    try {
      await loginStore.login({
        mobile: values.username,
        code: values.password
      })

      // 登录成功跳转到首页
      navigate('/', { replace: true })

      // 登录跳转提示
      message.success('登录成功')
    } catch (e) {
      // 登录失败 给予消息
      message.error(e.response?.data?.message || '登录失败')
    }
  }



  return (
    <div className={styles.login}>
      <Card className='login-container'>
        {/* logo图片 */}
        <img src={imgSrc} alt="" className='login-logo' />

        {/* form表单 */}
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            mobile: "13911111111",
            code: "246810",
            remember: true,
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "Please input correct username!"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                pattern: /^\d{6}$/,
                message: "Please input correct password!"
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            {/* 我已阅读并同意【用户协议】和【隐私条款】 */}
            <Checkbox><a>I have read and agree to the User Agreement and the Privacy Terms.</a></Checkbox>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button style={{ width: '100px', }} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
