import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd'

import './SignUp.scss'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

const SignUp: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  return (
    <div className="form_wrapper">
      <h2>Create new account</h2>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86'
        }}
        scrollToFirstError
      >
        <Form.Item
          className="form_item"
          name="Username"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            { required: true, min: 3, max: 20, message: 'Никнейм должен быть от 3 до 20 символов', whitespace: true }
          ]}
        >
          <Input placeholder="Username" />
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
          <Input placeholder="Email address" />
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
          {...tailFormItemLayout}
        >
          <Checkbox>I agree to the processing of my personal information</Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
        <p className="link-redirect-signUp">
          Already have an account?{' '}
          <Link to="/sign-in" style={{ color: '#1890FF' }}>
            Sign In
          </Link>
          .
        </p>
      </Form>
    </div>
  )
}

export default SignUp
