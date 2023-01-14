import { ArticleState } from './redux/actions-type'

export type State = {
  Arcticle: ArticleState[]
}

export type ArticleList = {
  slug: string
  // eslint-disable-next-line prettier/prettier
  title: string
  description: string
  body: string
  tagList: [string]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }

  articlesCount: number
}
