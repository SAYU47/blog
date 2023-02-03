/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import uniqid from 'uniqid'
import { Button, Popconfirm, message } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { RootState } from '@store/root-reduser'
import * as actions from '@store/actions'

import style from './MarkdownPage.module.scss'

interface Markdown {
  state: RootState
  getSinglepage: (slug: string) => void
  deleteSinglepage: (slug: string) => void
  likePost: (slug: string) => void
  unLikePost: (slug: string) => void
  slug: string
}

const MarkdownPage: FC<Markdown> = ({ likePost, unLikePost, getSinglepage, deleteSinglepage, state, slug }) => {
  const [ErrorImg, setErrorImg] = useState(false)
  const history = useHistory()
  const item = state.getArticleReduser.markdownPage
  const load = state.getArticleReduser.loading
  const userName = state.AutorizationReduser.user?.user.username
  const authorName = state.getArticleReduser.markdownPage
  const lsd = state.getArticleReduser.markdownPage
  const addiction = state.getArticleReduser.like
  useEffect(() => {
    getSinglepage(slug)
  }, [slug, addiction.favorited])

  const confirm = () => {
    deleteSinglepage(slug)
    message.success('Успешно удалено')
    actions.switchPage()
  }

  useEffect(() => {
    if (load) {
      actions.switchPage()
      history.replace('/')
    }
  }, [load])

  if (item.length === 0) return null
  const formatedTags =
    item.tagList !== null &&
    item.tagList.map((tag: string): any => {
      if (tag !== null && tag.length < 20) {
        return (
          <div key={uniqid()} className={style.card_tag}>
            {tag}
          </div>
        )
      }
      return null
    })
  const formatedDate = format(new Date(item.updatedAt), 'MMM d,yyyy')
  const defaultImg = '../../assets/img/Standart.svg'
  const cancel = () => {
    message.error('Click on No')
  }
  const itemValidate = item.title.length > 150 ? item.title.slice(0, 150).concat('...') : item.title
  const descriptionValidate = item.description.length > 500 ? item.description.slice(0, 500).concat('...') : item.title
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
  const unlike = '../../assets/img/unlike.svg'
  const like = '../../assets/img/like.svg'
  const onLike = () => {
    if (!item.favorited) {
      likePost(slug)
    } else {
      unLikePost(slug)
    }
  }
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
      <div className={style.title}>
        <h2>{itemValidate}</h2>
        <div className={style.like_box}>
          <img src={item.favorited ? like : unlike} onClick={onLike} />
          <p className={style.like_count}>{item.favoritesCount}</p>
        </div>
      </div>
      <div className={style.tag}>{formatedTags}</div>
      <p className={style.description}>{descriptionValidate}</p>
      <ReactMarkdown className={style.markdown}>{item.body}</ReactMarkdown>
    </div>
  )
}
const mapStateToProps = (state: RootState) => {
  return { state }
}

export default connect(mapStateToProps, actions)(MarkdownPage)
