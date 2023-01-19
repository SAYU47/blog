/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'
import { Dispatch } from 'redux'

import { GetActionTypes, GetCombinateTypes } from './actions-type'
import { LoginRequestData } from './requestsType'

export const switchPage = (num: number) => {
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
