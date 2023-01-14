import React, { FC, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import uniqid from 'uniqid'

import { RootState, useAppSelector } from '../../redux/root-reduser'
import * as actions from '../../redux/actions'

import style from './MarkdownPage.module.scss'

interface Markdown {
  state: RootState
  getSinglepage: (slug: string) => void
  slug: string
}

const MarkdownPage: FC<Markdown> = ({ getSinglepage, state, slug }) => {
  const [ErrorImg, setErrorImg] = useState(false)
  const item = state.getArticleReduser.markdownPage

  useEffect(() => {
    getSinglepage(slug)
  }, [slug])
  if (item.length === 0) return null
  // eslint-disable-next-line array-callback-return, consistent-return, @typescript-eslint/no-explicit-any
  const tags = item.tagList.map((tag: string): any => {
    if (tag.length < 20) {
      return (
        <div key={uniqid()} className={style.card_tag}>
          {tag}
        </div>
      )
    }
  })
  console.log(item)

  const formatedDate = format(new Date(item.updatedAt), 'MMM d,yyyy')
  const defaultImg = '../../assets/img/Standart.svg'

  return (
    <div className={style.wrapper}>
      <div className={style.autor_info}>
        <div className={style.autor_info_container}>
          <p>{item.author.username}</p>
          <p className={style.autor_info_date}>{formatedDate}</p>
        </div>
        <img src={ErrorImg ? defaultImg : item.author.image} onError={() => setErrorImg(true)} />
      </div>
      <h2 className={style.title}>{item.title}</h2>
      <div className={style.tag}>{tags}</div>
      <p className={style.description}>{item.description}</p>
      <ReactMarkdown>{item.body}</ReactMarkdown>
    </div>
  )
}
const mapStateToProps = (state: RootState) => {
  return { state }
}

export default connect(mapStateToProps, actions)(MarkdownPage)
