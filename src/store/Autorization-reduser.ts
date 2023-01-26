import { AutorizationState, GetActionTypes, GetCombinateTypes } from 'actions-type'

const initialState: AutorizationState = {
  user: null,
  isLoged: false,
  errors: false,
  article: null
}

const AutorizationReduser = (state = initialState, action: GetCombinateTypes): AutorizationState => {
  switch (action.type) {
    case GetActionTypes.LOGIN_IN: {
      return {
        ...state,
        user: action.payload,
        isLoged: action.isLoged,
        errors: false
      }
    }
    case GetActionTypes.REGISTERATION: {
      return {
        ...state,
        user: action.payload,
        isLoged: action.isLoged,
        errors: false
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
      return { ...state, user: action.payload, isLoged: action.isLoged, errors: action.errors }
    }
    case GetActionTypes.SET_LOGOUT: {
      return {
        ...state,
        isLoged: action.isLoged
      }
    }
    case GetActionTypes.ERROR: {
      return { ...state, errors: action.errors }
    }

    default:
      return state
  }
}

export default AutorizationReduser
