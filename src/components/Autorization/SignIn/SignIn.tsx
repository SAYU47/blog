import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Input } from 'antd'

import './SignIn.scss'

const SignIn: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login_wrapper">
      <h2>Sign In</h2>
      <Form
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 0 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email address"
          name="Email address"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input style={{ height: 40 }} placeholder="Email address" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 0 }}>
          <Button type="primary" htmlType="submit" style={{ marginTop: 21 }}>
            Login
          </Button>
        </Form.Item>
        <p className="link-redirect-signIn">
          Don’t have an account?{' '}
          <Link to="/sign-up" style={{ color: '#1890FF' }}>
            Sign Up
          </Link>
          .
        </p>
      </Form>
    </div>
  )
}

export default SignIn
