import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { combineReducers } from 'redux'

import getArticleReduser from './getArcticleReduser'

export const rootReduser = combineReducers({
  getArticleReduser,
})

export type RootState = ReturnType<typeof rootReduser>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
