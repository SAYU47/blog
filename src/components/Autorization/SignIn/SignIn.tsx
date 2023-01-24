import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { RootState } from '../../../redux/root-reduser'
import * as actions from '../../../redux/actions'
import { LoginRequestData } from '../../../redux/requestsType'

import './SignIn.scss'

const SignIn: FC = ({ loginIn, state }: any) => {
  const history = useHistory()
  const errorInfo = state.AutorizationReduser.error

  const [isErorr, setIsError] = useState(false)
  const { isLoged } = state.AutorizationReduser

  const onFinish = (values: LoginRequestData) => {
    const postData: any = {
      user: { email: values.email, password: values.password }
    }
    loginIn(postData)
    setIsError(false)
  }
  if (isLoged) history.goBack()
  useEffect(() => {
    if (errorInfo !== null) {
      setIsError(true)
    }
  }, [errorInfo])

  const onFinishFailed = () => {
    setIsError(true)
  }

  return (
    <div className="login_wrapper">
      <h2>Sign In</h2>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
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
          <Input style={{ height: 40, width: 320 }} placeholder="Email address" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 0 }}>
          <Button type="primary" htmlType="submit" className="login_btn">
            Login
          </Button>
        </Form.Item>
        <p className="link-redirect-signIn">
          Don’t have an account?
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
