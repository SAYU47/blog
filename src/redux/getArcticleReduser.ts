import { ArticleState, GetActionTypes, GetCombinateTypes } from './actions-type'

const initialState: ArticleState = {
  articleList: [],
  markdownPage: [],
  errors: false,
  loading: false,
  offset: 0,
  totalPages: 0
}

const getArticleReduser = (state = initialState, action: GetCombinateTypes): ArticleState => {
  switch (action.type) {
    case GetActionTypes.SUCCESS_LOAD: {
      return {
        ...state,
        articleList: [...action.payload],
        loading: false,
        errors: false,
        totalPages: action.totalPages
      }
    }
    case GetActionTypes.ERROR_LOAD: {
      return { ...state, errors: action.payload }
    }
    case GetActionTypes.PAGINATION: {
      return {
        ...state,
        offset: action.offset,
        loading: true
      }
    }
    case GetActionTypes.GET_SINGLEPAGE: {
      return { ...state, markdownPage: action.payload, loading: true }
    }
    case GetActionTypes.UPDATE_ARTICLE: {
      return { ...state, markdownPage: action.payload, loading: true }
    }
    case GetActionTypes.DELETE_ARTICLE: {
      return { ...state, loading: true }
    }
    default:
      return state
  }
}

export default getArticleReduser
