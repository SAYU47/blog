/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { Dispatch } from 'redux'

import { GetActionTypes, GetCombinateTypes } from 'actions-type'
import { ArticleRequestType, LoginRequestData, RegisterRequestData, updateInfo } from 'requests-type'

export const switchPage = (num = 1) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios({
        url: `https://blog.kata.academy/api/articles?limit=5&offset=${num}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      dispatch({
        type: GetActionTypes.SUCCESS_LOAD,
        payload: response.data.articles,
        totalPages: response.data.articlesCount,
        loading: false,
        errors: false
      })
    } catch (error: any) {
      if (error.request) {
        dispatch({ type: GetActionTypes.ERROR_LOAD, payload: true })
      }
    }
  }
}

export const getSinglepage = (slug: string) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    const token = localStorage.getItem('token')
    const response = await axios({
      url: `https://blog.kata.academy/api/articles/${slug}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

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
        type: GetActionTypes.ERROR,
        isLoged: false,
        errors: errors.response.data.errors,
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
        error: response.data.errors
      })
    } catch (errors: any) {
      dispatch({
        type: GetActionTypes.ERROR,
        isLoged: false,
        errors: errors.response.data.errors,
        payload: null
      })
    }
  }
}
export const editProfile = (data: updateInfo) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    const token = localStorage.getItem('token')
    try {
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
        errors: false
      })
    } catch (error: any) {
      dispatch({
        type: GetActionTypes.ERROR,
        errors: true
      })
    }
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
      error: null,
      loading: true
    })
  }
}
export const likePost = (slug: string) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    const token = localStorage.getItem('token')
    const response = await axios({
      method: 'post',
      url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    dispatch({
      type: GetActionTypes.LIKE_POST,
      payload: response.data.article
    })
  }
}
export const unLikePost = (slug: string) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    const token = localStorage.getItem('token')
    const response = await axios({
      method: 'delete',
      url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    dispatch({
      type: GetActionTypes.UNLIKE_POST,
      payload: response.data.article
    })
  }
}
