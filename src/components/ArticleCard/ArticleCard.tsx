/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { FC, useEffect, useState } from 'react'
import uniqid from 'uniqid'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { ArticleList } from 'responese-type'
import * as actions from '@store/actions'
import { RootState } from '@store/root-reduser'

import style from './ArticleCard.module.scss'

const ArticleCard: FC<ArticleList> = ({
  title,
  description,
  tagList,
  author,
  updatedAt,
  slug,
  favoritesCount,
  favorited
}) => {
  const formatedDate = format(new Date(updatedAt), 'MMM d,yyyy')
  const formatedTitle = title.length > 50 ? title.slice(0, 50).concat('...') : title

  const [ErrorImg, setErrorImg] = useState(false)

  const formatedTags =
    tagList !== null &&
    tagList.map((tag: string): any => {
      if (tag.length < 20) {
        return (
          <div key={uniqid()} className={style.card_tag}>
            {tag}
          </div>
        )
      }
    })
  type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
  const dispatch: AppDispatch = useDispatch()

  const onLike = () => {
    if (slug !== undefined) {
      if (!favorited) {
        dispatch(actions.likePost(slug))
      } else {
        dispatch(actions.unLikePost(slug))
      }
    }
  }

  const unlike = '../../assets/img/unlike.svg'
  const liked = '../../assets/img/like.svg'
  const defaultImg = '../../assets/img/Standart.svg'
  return (
    <div className={style.card_wrapper}>
      <section>
        <div className={style.title}>
          <Link to={`/articles/${slug}`}>{formatedTitle}</Link>
          <div className={style.like_box}>
            <img src={favorited ? liked : unlike} onClick={onLike} />
            <p className={style.like_count}>{favoritesCount}</p>
          </div>
        </div>
        {formatedTags}
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
const mapStatetoProps = (state: RootState) => {
  return { state }
}
export default connect(mapStatetoProps, actions)(ArticleCard)
