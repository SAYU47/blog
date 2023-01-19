import React from 'react'

import { AutorizationState, GetActionTypes, GetCombinateTypes } from './actions-type'

const initialState: AutorizationState = {
  user: null,
  isLoged: false,
  error: null
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
    case GetActionTypes.SET_LOGIN: {
      return {
        ...state,
        user: action.payload,
        isLoged: action.isLoged
      }
    }
    case GetActionTypes.SET_LOGOUT: {
      return {
        ...state,
        isLoged: action.isLoged
      }
    }
    default:
      return state
  }
}

export default AutorizationReduser
