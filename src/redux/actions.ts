// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'
import { Dispatch } from 'redux'

import { GetActionTypes, GetCombinateTypes } from './actions-type'

export const switchPage = (num: number) => {
  return async (dispatch: Dispatch<GetCombinateTypes>) => {
    try {
      const response = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${num}`)
      dispatch({
        type: GetActionTypes.SUCCESS_LOAD,
        payload: response.data.articles,
        totalPages: response.data.articlesCount,
        loading: false,
        errors: false,
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
      payload: response.data.article,
    })
  }
}
