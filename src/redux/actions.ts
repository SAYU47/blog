/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Dispatch } from 'redux'

import { GetActionTypes, GetCombinateTypes } from './actions-type'
import { ArticleRequestType, LoginRequestData, RegisterRequestData, updateInfo } from './requestsType'

export const switchPage = (num = 1) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    try {
      const response = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${num}`)
      dispatch({
        type: GetActionTypes.SUCCESS_LOAD,
        payload: response.data.articles,
        totalPages: response.data.articlesCount,
        loading: false,
        errors: false
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.request) {
        dispatch({ type: GetActionTypes.ERROR_LOAD, payload: true })
      }
    }
  }
}

export const getSinglepage = (slug: string) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    const response = await axios.get(`https://blog.kata.academy/api/articles/${slug}`)
    dispatch({
      type: GetActionTypes.GET_SINGLEPAGE,
      payload: response.data.article
    })
  }
}
export const updateSinglepage = (slug: string, postData: ArticleRequestType) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    const token = localStorage.getItem('token')
    const response = await axios({
      method: 'put',
      url: `https://blog.kata.academy/api/articles/${slug}`,
      data: JSON.stringify(postData),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    dispatch({
      type: GetActionTypes.UPDATE_ARTICLE,
      payload: response.data.article
    })
  }
}
export const deleteSinglepage = (slug: string) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    const token = localStorage.getItem('token')
    await axios({
      method: 'delete',
      url: `https://blog.kata.academy/api/articles/${slug}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    dispatch({
      type: GetActionTypes.DELETE_ARTICLE
    })
  }
}
export const setLoginIn = () => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    const token = localStorage.getItem('token')
    if (!token) return
    const response = await axios({
      method: 'get',
      url: 'https://blog.kata.academy/api/user',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    dispatch({
      type: GetActionTypes.SET_LOGIN,
      payload: response.data,
      isLoged: true
    })
  }
}
export const setLogOut = () => {
  return (dispatch: Dispatch<GetCombinateTypes>) => {
    dispatch({
      type: GetActionTypes.SET_LOGOUT,
      isLoged: false
    })
    localStorage.removeItem('token')
  }
}
export const loginIn = (data: LoginRequestData) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://blog.kata.academy/api/users/login',
        data: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })

      if (!localStorage.getItem('token')) localStorage.setItem('token', response.data.user.token)
      dispatch({
        type: GetActionTypes.LOGIN_IN,
        payload: response.data,
        isLoged: true,
        error: null
      })
    } catch (errors: any) {
      dispatch({
        type: GetActionTypes.LOGIN_IN,
        isLoged: false,
        error: errors.response.data.errors,
        payload: null
      })
    }
  }
}
export const registerIn = (data: RegisterRequestData) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://blog.kata.academy/api/users',
        data: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      localStorage.setItem('token', response.data.user.token)
      dispatch({
        type: GetActionTypes.REGISTERATION,
        payload: response.data,
        isLoged: true,
        error: null
      })
    } catch (errors: any) {
      dispatch({
        type: GetActionTypes.REGISTERATION,
        isLoged: false,
        error: errors.response.data.errors,
        payload: null
      })
    }
  }
}
export const editProfile = (data: updateInfo) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    const token = localStorage.getItem('token')
    const response = await axios({
      method: 'put',
      url: 'https://blog.kata.academy/api/user',
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    dispatch({
      type: GetActionTypes.EDIT_PROFILE,
      payload: response.data,
      isLoged: true,
      error: null
    })
  }
}
export const createArticle = (data: ArticleRequestType) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    const token = localStorage.getItem('token')
    const response = await axios({
      method: 'post',
      url: 'https://blog.kata.academy/api/articles',
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

    dispatch({
      type: GetActionTypes.CREATE_ARTICLE,
      payload: response.data,
      error: null
    })
  }
}
