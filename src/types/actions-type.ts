/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArticleList } from 'responese-type'
import { ArticleRequestType, getResponseLogin } from 'requests-type'

export interface ArticleState {
  articleList: ArticleList[]
  createdPage: any
  markdownPage: any
  errors: unknown
  loading: boolean
  offset: number
  totalPages: number
  like: any
}
export interface AutorizationState {
  user: getResponseLogin | null | undefined
  article: ArticleRequestType | null
  isLoged: boolean
  errors: boolean
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
  DELETE_ARTICLE = 'DELETE_ARTICLE',
  LIKE_POST = 'LIKE_POST',
  UNLIKE_POST = 'UNLIKE_POST',
  ERROR = 'ERROR'
}
interface likePost {
  type: GetActionTypes.LIKE_POST
  payload: []
}
interface unLikePost {
  type: GetActionTypes.UNLIKE_POST
  payload: []
}
interface catchErrors {
  errors: boolean
  type: GetActionTypes.ERROR
  // payload: null | Error
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
  loading: boolean
  error: any
}
interface setLogOut {
  type: GetActionTypes.SET_LOGOUT
  isLoged: boolean
}
interface editProfile {
  errors: boolean
  type: GetActionTypes.EDIT_PROFILE
  payload?: getResponseLogin | null
  isLoged: boolean
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
  | catchErrors
  | likePost
  | unLikePost
