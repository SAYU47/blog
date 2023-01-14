/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArticleList } from '../responese-type'

export interface ArticleState {
  articleList: ArticleList[]
  // eslint-disable-next-line prettier/prettier
  markdownPage: any
  errors: unknown
  loading: boolean
  offset: number
  totalPages: number
}
// eslint-disable-next-line no-shadow
export enum GetActionTypes {
  SUCCESS_LOAD = 'SUCCESS_LOAD',
  ERROR_LOAD = 'ERROR_LOAD',
  PAGINATION = 'PAGINATION',
  GET_SINGLEPAGE = 'GET_SINGLEPAGE',
}
interface getSinglepage {
  type: GetActionTypes.GET_SINGLEPAGE
  payload: ArticleList
}
interface getArticleLoadSucces {
  type: GetActionTypes.SUCCESS_LOAD
  payload: ArticleList[]
  loading: boolean
  errors: boolean
  totalPages: number
}
interface getArticleLoadError {
  type: GetActionTypes.ERROR_LOAD
  payload: unknown
}
interface ArticlePagination {
  type: GetActionTypes.PAGINATION
  offset: number
  payload: ArticleList[]
}
export type GetCombinateTypes =
  | getArticleLoadSucces
  | getArticleLoadError
  | ArticlePagination
  | getSinglepage
