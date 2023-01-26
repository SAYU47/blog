/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import uniqid from 'uniqid'
import { Button, Form, Input } from 'antd'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import * as actions from '@store/actions'
import './andt.scss'
import { RootState, useAppSelector } from '@store/root-reduser'
import Loader from '@components/UI/Loader/Loader'

import style from './CreateArticle.module.scss'

const CreateArticle: React.FC = ({ createArticle, switchPage }: any) => {
  const [redirect, setRedirect] = useState(false)
  const history = useHistory()
  const [form] = Form.useForm()
  const load = useAppSelector((state) => state.getArticleReduser.loading)
  const onFinish = (values: any) => {
    const postData: any = {
      article: { title: values.title, description: values.description, body: values.body, tagList: values.tagList }
    }
    createArticle(postData)
    setRedirect(true)
  }
  useEffect(() => {
    if (load) {
      history.replace('/')
      setRedirect(false)
    }
  }, [load])
  const showLoader = redirect ? <Loader /> : null
  return (
    <>
      {showLoader || (
        <div className={style.form_wrapper}>
          <h2>Create new article</h2>
          <Form
            className={style.form_inputs}
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
              name="title"
              label="Title"
              rules={[{ required: true, whitespace: true, message: 'Это поле обязательное' }]}
            >
              <Input placeholder="Title" style={{ width: '874px', height: '40px' }} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Short description"
              rules={[{ required: true, message: 'Это поле обязательное', whitespace: true }]}
            >
              <Input placeholder="Short description" style={{ width: '874px', height: '40px' }} />
            </Form.Item>
            <Form.Item
              name="body"
              label="Text"
              rules={[{ required: true, message: 'Это поле обязательное', whitespace: true }]}
            >
              <Input.TextArea placeholder="Text" className={style.text_aria} />
            </Form.Item>
            <div className={style.tags_form}>
              <Form.List name={'tagList'}>
                {(fields, { add, remove }) => (
                  <>
                    <div key={uniqid()} className={style.tags_form_wrapper}>
                      {fields.map((field) => (
                        <div key={field.key} className={style.input_form}>
                          <Form.Item
                            {...field}
                            className={style.add_tag_field}
                            rules={[{ required: true, message: 'Введите тег или удалите это поле', whitespace: true }]}
                          >
                            <Input
                              className={style.input}
                              placeholder="Tag"
                              style={{
                                height: '40px',
                                width: '300px'
                              }}
                            />
                          </Form.Item>
                          <Button danger className={style.delete_btn} onClick={() => remove(field.name)}>
                            Delete
                          </Button>
                        </div>
                      ))}
                    </div>
                    <>
                      <Button onClick={() => add()} className={style.add_tag_btn}>
                        Add tags
                      </Button>
                    </>
                  </>
                )}
              </Form.List>
            </div>
            <Form.Item>
              <Button className={style.send_btn} type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  )
}
const mapStateToProps = (state: RootState) => {
  return { state }
}
export default connect(mapStateToProps, actions)(CreateArticle)
