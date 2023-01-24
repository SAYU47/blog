/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArticleList } from '../responese-type'

import { ArticleRequestType, getResponseLogin } from './requestsType'

export interface ArticleState {
  articleList: ArticleList[]
  // eslint-disable-next-line prettier/prettier
  markdownPage: any
  errors: unknown
  loading: boolean
  offset: number
  totalPages: number
}
export interface AutorizationState {
  user: getResponseLogin | null
  article: ArticleRequestType | null
  isLoged: boolean
  error: Error | null
}
// eslint-disable-next-line no-shadow
export enum GetActionTypes {
  SUCCESS_LOAD = 'SUCCESS_LOAD',
  ERROR_LOAD = 'ERROR_LOAD',
  PAGINATION = 'PAGINATION',
  GET_SINGLEPAGE = 'GET_SINGLEPAGE',
  LOGIN_IN = 'LOGIN_IN',
  SET_LOGIN = 'SET_LOGIN',
  SET_LOGOUT = 'SET_LOGOUT',
  REGISTERATION = 'REGISTERATION',
  EDIT_PROFILE = 'EDIT_PROFILE',
  CREATE_ARTICLE = 'CREATE_ARTICLE',
  UPDATE_ARTICLE = 'UPDATE_ARTICLE',
  DELETE_ARTICLE = 'DELETE_ARTICLE'
}
interface deleteArticle {
  type: GetActionTypes.DELETE_ARTICLE
}
interface updateArticle {
  type: GetActionTypes.UPDATE_ARTICLE
  payload: ArticleList | null
  // error: any
}
interface createArticle {
  type: GetActionTypes.CREATE_ARTICLE
  payload: ArticleRequestType | null
  error: any
}
interface setLogOut {
  type: GetActionTypes.SET_LOGOUT
  isLoged: boolean
}
interface editProfile {
  type: GetActionTypes.EDIT_PROFILE
  payload: getResponseLogin | null
  isLoged: boolean
  error: any
}
interface setLoginIn {
  type: GetActionTypes.SET_LOGIN
  payload: null | getResponseLogin
  isLoged: boolean
}
interface regestration {
  type: GetActionTypes.REGISTERATION
  payload: getResponseLogin | null
  isLoged: boolean
  error: any
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
interface loginIn {
  type: GetActionTypes.LOGIN_IN
  payload: getResponseLogin | null
  isLoged: boolean
  error: any
}
export type GetCombinateTypes =
  | getArticleLoadSucces
  | getArticleLoadError
  | ArticlePagination
  | getSinglepage
  | loginIn
  | setLoginIn
  | setLogOut
  | regestration
  | editProfile
  | createArticle
  | updateArticle
  | deleteArticle
