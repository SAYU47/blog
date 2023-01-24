import React from 'react'

import { AutorizationState, GetActionTypes, GetCombinateTypes } from './actions-type'

const initialState: AutorizationState = {
  user: null,
  isLoged: false,
  error: null,
  article: null
}

const AutorizationReduser = (state = initialState, action: GetCombinateTypes): AutorizationState => {
  switch (action.type) {
    case GetActionTypes.LOGIN_IN: {
      return {
        ...state,
        user: action.payload,
        isLoged: action.isLoged,
        error: action.error
      }
    }
    case GetActionTypes.REGISTERATION: {
      return {
        ...state,
        user: action.payload,
        isLoged: action.isLoged,
        error: action.error
      }
    }
    case GetActionTypes.SET_LOGIN: {
      return {
        ...state,
        user: action.payload,
        isLoged: action.isLoged
      }
    }
    case GetActionTypes.EDIT_PROFILE: {
      return { ...state, user: action.payload, isLoged: action.isLoged, error: action.error }
    }
    case GetActionTypes.SET_LOGOUT: {
      return {
        ...state,
        isLoged: action.isLoged
      }
    }
    case GetActionTypes.CREATE_ARTICLE: {
      return { ...state, article: action.payload }
    }
    default:
      return state
  }
}

export default AutorizationReduser
