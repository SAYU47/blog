/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Checkbox, Form, Input } from 'antd'

import './SignUp.scss'

import * as actions from '@store/actions'
import { RootState } from '@store/root-reduser'

const SignUp: React.FC = ({ state, registerIn }: any) => {
  const history = useHistory()
  const [form] = Form.useForm()
  const { isLoged } = state.AutorizationReduser
  const hasError = state.AutorizationReduser.errors

  const onFinish = (values: any) => {
    const postData: any = {
      user: { username: values.username, email: values.email, password: values.password }
    }
    registerIn(postData)
  }
  if (isLoged) history.goBack()
  return (
    <div className="form_wrapper">
      <h2>Create new account</h2>
      {hasError?.email ? <p style={{ color: 'red' }}>Email {hasError.email}</p> : null}
      {hasError?.username ? <p style={{ color: 'red' }}>Username {hasError.username}</p> : null}
      <Form form={form} name="register" onFinish={onFinish}>
        <Form.Item
          name="username"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              min: 3,
              max: 20,
              message: 'Никнейм должен быть от 3 до 20 символов'
            }
          ]}
        >
          <Input placeholder="Username" style={{ width: '320px', height: '40px' }} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email address"
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
          <Input placeholder="Email address" style={{ width: '320px', height: '40px' }} />
        </Form.Item>
        <Form.Item
          style={{ whiteSpace: 'nowrap' }}
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Your password needs to be at least 6 characters.',
              min: 6,
              max: 40
            }
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          style={{ whiteSpace: 'nowrap' }}
          name="Repeat Password"
          label="Repeat Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              }
            })
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))
            }
          ]}
        >
          <Checkbox>I agree to the processing of my personal information</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="create_btn">
            Create
          </Button>
        </Form.Item>
        <p className="link-redirect-signUp">
          Already have an account?
          <Link to="/sign-in" style={{ color: '#1890FF' }}>
            Sign In
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
export default connect(mapStateToProps, actions)(SignUp)
