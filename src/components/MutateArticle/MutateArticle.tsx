/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import React, { FC, useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import uniqid from 'uniqid'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { RootState, useAppSelector } from '@store/root-reduser'
import * as actions from '@store/actions'
import { ArticleRequestType } from 'requests-type'

import style from './MutateArticle.module.scss'
import Loader from '@components/UI/Loader/Loader'

interface PropsType {
  updateSinglepage: (slug: string, postData: ArticleRequestType) => void
  getSinglepage: (slug: string) => void
  createArticle: (postData: ArticleRequestType) => void
  slug: string
}
const EditArticle = (props: PropsType): any => {
  const [redirect, setRedirect] = useState(false)
  const { updateSinglepage } = props
  const { getSinglepage } = props
  const { createArticle } = props
  const { slug } = props
  const editTitle = useAppSelector((state) => state.getArticleReduser.markdownPage.title)
  const editDescripton = useAppSelector((state) => state.getArticleReduser.markdownPage.description)
  const editBody = useAppSelector((state) => state.getArticleReduser.markdownPage.body)
  const editTags = useAppSelector((state) => state.getArticleReduser.markdownPage.tagList)
  const [form] = Form.useForm()
  const history = useHistory()

  const onFinish = (values: any) => {
    const postData: ArticleRequestType = {
      article: { title: values.title, description: values.description, body: values.body, tagList: values.tagList }
    }
    if (slug !== undefined) {
      updateSinglepage(slug, postData)
    } else {
      createArticle(postData)
    }
  }
  useEffect(() => {
    setRedirect(false)
    return () => history.replace('/')
  }, [onFinish])
  const showLoader = redirect ? <Loader /> : null
  return (
    <>
      {showLoader || (
        <div className={style.form_wrapper}>
          <h2>{slug ? 'Edit article' : 'Create new article'}</h2>
          <Form className={style.form_inputs} form={form} name="register" onFinish={onFinish} scrollToFirstError>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Это поле обязательное', whitespace: true }]}
              initialValue={slug ? editTitle : null}
            >
              <Input placeholder="Title" style={{ width: '874px', height: '40px' }} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Short description"
              rules={[{ required: true, message: 'Это поле обязательное', whitespace: true }]}
              initialValue={slug ? editDescripton : null}
            >
              <Input placeholder="Short description" style={{ width: '874px', height: '40px' }} />
            </Form.Item>
            <Form.Item
              name="body"
              label="Text"
              rules={[{ required: true, message: 'Это поле обязательное', whitespace: true }]}
              initialValue={slug ? editBody : null}
            >
              <Input.TextArea placeholder="Text" className={style.text_aria} />
            </Form.Item>
            <div className={style.tags_form}>
              <Form.List name={'tagList'} initialValue={slug ? editTags : null}>
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

export default connect(mapStateToProps, actions)(EditArticle)
