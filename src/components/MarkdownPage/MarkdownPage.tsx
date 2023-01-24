/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import uniqid from 'uniqid'
import { Button, Popconfirm, message } from 'antd'
import { Link, Redirect, useHistory } from 'react-router-dom'

import { RootState, useAppSelector } from '../../redux/root-reduser'
import * as actions from '../../redux/actions'

import style from './MarkdownPage.module.scss'

interface Markdown {
  state: RootState
  getSinglepage: (slug: string) => void
  deleteSinglepage: (slug: string) => void
  slug: string
}

const MarkdownPage: FC<Markdown> = ({ getSinglepage, deleteSinglepage, state, slug }) => {
  const [ErrorImg, setErrorImg] = useState(false)
  const history = useHistory()
  const item = state.getArticleReduser.markdownPage
  const userName = state.AutorizationReduser.user?.user.username
  const authorName = state.getArticleReduser.markdownPage
  const abs = () => {
    return history.replace('/')
  }
  const confirm = () => {
    deleteSinglepage(slug)
    message.success('Click on Yes')
    setTimeout(() => history.push('/'), 100)
  }
  // useEffect(() => {
  //   return () => history.replace('/')
  // }, [confirm])
  useEffect(() => {
    getSinglepage(slug)
    // history.replace('/')
  }, [slug])

  if (item.length === 0) return null
  // eslint-disable-next-line array-callback-return, consistent-return, @typescript-eslint/no-explicit-any
  const tags = item.tagList.map((tag: string): any => {
    if (tag !== null && tag.length < 20) {
      return (
        <div key={uniqid()} className={style.card_tag}>
          {tag}
        </div>
      )
    }
  })
  const formatedDate = format(new Date(item.updatedAt), 'MMM d,yyyy')
  const defaultImg = '../../assets/img/Standart.svg'
  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    message.error('Click on No')
  }

  const buttonsGroup = (
    <div className={style.edit_btn_group}>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
        placement="rightTop"
      >
        <Button danger className={style.delete_btn}>
          Delete
        </Button>
      </Popconfirm>

      <Link to={`/articles/${slug}/edit`} className={style.edit_btn}>
        Edit
      </Link>
    </div>
  )
  const showButtons = userName === authorName.author.username ? buttonsGroup : null

  return (
    <div className={style.wrapper}>
      <div className={style.autor_info}>
        <div className={style.autor_info_container}>
          <p>{item.author.username}</p>
          <p className={style.autor_info_date}>{formatedDate}</p>
        </div>
        <img src={ErrorImg ? defaultImg : item.author.image} onError={() => setErrorImg(true)} />
      </div>
      {showButtons}
      <h2 className={style.title}>{item.title}</h2>
      <div className={style.tag}>{tags}</div>
      <p className={style.description}>{item.description}</p>
      <ReactMarkdown className={style.markdown}>{item.body}</ReactMarkdown>
    </div>
  )
}
const mapStateToProps = (state: RootState) => {
  return { state }
}

export default connect(mapStateToProps, actions)(MarkdownPage)
