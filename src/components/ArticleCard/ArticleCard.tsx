/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react'
import uniqid from 'uniqid'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { ArticleList } from '../../responese-type'

import style from './ArticleCard.module.scss'

const ArticleCard: FC<ArticleList> = ({ title, description, tagList, author, updatedAt, slug }) => {
  const formatedDate = format(new Date(updatedAt), 'MMM d,yyyy')
  const formatedTitle = title.length > 50 ? title.slice(0, 50).concat('...') : title
  const defaultImg = '../../assets/img/Standart.svg'
  const [ErrorImg, setErrorImg] = useState(false)
  // eslint-disable-next-line consistent-return, array-callback-return
  const tagss = tagList.map((tag: string): any => {
    if (tag !== null && tag.length < 20) {
      return (
        <div key={uniqid()} className={style.card_tag}>
          {tag}
        </div>
      )
    }
  })
  return (
    <div className={style.card_wrapper}>
      <section>
        <h2>
          <Link className={style.title} to={`/articles/${slug}`}>
            {formatedTitle}
          </Link>
        </h2>
        {tagss}
        <p className={style.article_text}>{description}</p>
      </section>
      <section className={style.autor_info}>
        <div className={style.autor_info_container}>
          <p>{author.username}</p>
          <p className={style.autor_info_date}>{formatedDate}</p>
        </div>
        <img src={ErrorImg ? defaultImg : author.image} onError={() => setErrorImg(true)} />
      </section>
    </div>
  )
}
export default ArticleCard
