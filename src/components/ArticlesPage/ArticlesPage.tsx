import React, { FC, useEffect, useMemo } from 'react'
import { connect, useDispatch } from 'react-redux'
import uniqid from 'uniqid'

import * as actions from '../../redux/actions'
import { RootState } from '../../redux/root-reduser'
import ArticleCard from '../ArticleCard/ArticleCard'
import Loader from '../UI/Loader/Loader'
import PaginationList from '../UI/Pagination/Pagination'

interface ArcticlePage {
  state: RootState
  switchPage: (offset: number) => void
}

const ArticlesPage: FC<ArcticlePage> = ({ state, switchPage }) => {
  const arcticle = state.getArticleReduser.articleList
  const totalItems = state.getArticleReduser.totalPages
  const loaderIndicate = state.getArticleReduser.loading
  const { offset } = state.getArticleReduser

  useEffect(() => {
    switchPage(offset)
  }, [offset])

  const articleList = arcticle.map((el) => {
    return (
      <li key={uniqid()}>
        <ArticleCard
          title={el.title}
          description={el.description}
          tagList={el.tagList}
          author={el.author}
          updatedAt={el.updatedAt}
          slug={el.slug}
          body={''}
          createdAt={''}
          favorited={false}
          favoritesCount={0}
          articlesCount={0}
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
