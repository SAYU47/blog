import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { combineReducers } from 'redux'

import AutorizationReduser from '@store/Autorization-reduser'
import getArticleReduser from '@store/getArcticleReduser'

export const rootReduser = combineReducers({
  getArticleReduser,
  AutorizationReduser
})

export type RootState = ReturnType<typeof rootReduser>
export type AppDispatch = ReturnType<typeof rootReduser>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
