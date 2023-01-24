import { Button, Form, Input } from 'antd'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

import { RootState, useAppSelector } from '../../redux/root-reduser'
import * as actions from '../../redux/actions'

const EditProfile = ({ editProfile }: any) => {
  const history = useHistory()
  const authorInfo = useAppSelector((state) => state.AutorizationReduser.user)
  const onFinish = (values: any) => {
    const updateData: any = {
      user: { username: values.username, email: values.email, password: values.password, image: values.image }
    }
    editProfile(updateData)
    history.replace('/')
  }
  const onFinishFailed = () => {
    console.log('fail')
  }
  return (
    <div className="login_wrapper">
      <h2>Edit Profile</h2>
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
          className="form_item"
          name="username"
          label="Username"
          tooltip="What do you want others to call you?"
          initialValue={authorInfo?.user.username}
          rules={[
            { required: true, min: 3, max: 20, message: 'Никнейм должен быть от 3 до 20 символов', whitespace: true }
          ]}
        >
          <Input placeholder="Username" style={{ height: 40 }} />
        </Form.Item>
        <Form.Item
          label="Email address"
          name="email"
          initialValue={authorInfo?.user.email}
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
          label="New password"
          name="password"
          rules={[{ required: false, message: 'Your password needs to be at least 6 characters.', min: 6, max: 40 }]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item name="image" label="Avatar image (url)" initialValue={authorInfo?.user.image}>
          <Input placeholder="Avatar image" style={{ height: 40 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 0, span: 0 }}>
          <Button type="primary" htmlType="submit" style={{ marginTop: 21, width: 320, height: 40 }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
const mapStateToProps = (state: RootState) => {
  return { state }
}
export default connect(mapStateToProps, actions)(EditProfile)
