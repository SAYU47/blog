import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { Link, Redirect, useHistory } from 'react-router-dom'

import { RootState, useAppSelector } from '../../../redux/root-reduser'
import * as actions from '../../../redux/actions'
import { LoginRequestData } from '../../../redux/requestsType'

import './SignIn.scss'

const SignIn: FC = ({ loginIn, state }: any) => {
  const history = useHistory()
  const abs = state.AutorizationReduser.error

  const [isErorr, setIsError] = useState(false)

  const { isLoged } = state.AutorizationReduser
  if (isLoged) {
    history.push('/')
  }
  const onFinish = (values: LoginRequestData) => {
    const postData: any = {
      user: { email: values.email, password: values.password }
    }
    loginIn(postData)
    setIsError(false)
  }

  useEffect(() => {
    if (abs !== null) {
      setIsError(true)
    }
  }, [abs])

  const onFinishFailed = () => {
    setIsError(true)
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
        {isErorr ? <p className="error-login">Autorization Erorr</p> : null}
        <Form.Item
          label="Email address"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
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
const mapStateToProps = (state: RootState) => {
  return { state }
}
export default connect(mapStateToProps, actions)(SignIn)
