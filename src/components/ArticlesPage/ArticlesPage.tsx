/* eslint-disable prettier/prettier */
import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import uniqid from 'uniqid'

import * as actions from '@store/actions'
import { RootState } from '@store/root-reduser'
import ArticleCard from '@components/ArticleCard/ArticleCard'
import Loader from '@components/UI/Loader/Loader'
import PaginationList from '@components/UI/Pagination/Pagination'

interface ArcticlePage {
  state: RootState
  switchPage: (offset: number) => void
}

const ArticlesPage: FC<ArcticlePage> = ({ state, switchPage }) => {
  const arcticle = state.getArticleReduser.articleList
  const totalItems = state.getArticleReduser.totalPages
  const loaderIndicate = state.getArticleReduser.loading
  const { offset } = state.getArticleReduser
  const addiction = state.getArticleReduser.like
  useEffect(() => {
    switchPage(offset)
  }, [offset, addiction.slug, addiction.favorited])
  const articleList = arcticle.map((el) => {
    return (
      <li key={uniqid()}>
        <ArticleCard
          title={el.title}
          description={el.description}
          tagList={el.tagList}
          author={el.author}
          updatedAt={el.updatedAt}
          favorited={el.favorited}
          favoritesCount={el.favoritesCount}
          slug={el.slug}
        />
      </li>
    )
  })
  const showPagination = <PaginationList totalItems={totalItems} />

  const showLoader = loaderIndicate ? <Loader /> : null

  return (
    <>
      <ul>{showLoader || articleList}</ul>
      {showPagination}
    </>
  )
}

const mapStateToProps = (state: RootState) => {
  return { state }
}

export default connect(mapStateToProps, actions)(ArticlesPage)
