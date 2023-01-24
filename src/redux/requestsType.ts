/* eslint-disable prettier/prettier */
export interface LoginRequestData {
  email: string
  password: string
}
export interface RegisterRequestData {
  username: string
  email: string
  password: string
}
export interface getResponseLogin {
  user: {
    username: string
    email: string
    token: string
    image?: string
  }
}
export interface ArticleRequestType {
  article: {
    title: string
    description: string
    body: string
    tagList: [string]
  }
}
export interface updateInfo {
  user: {
    username: string
    email: string
    password?: string
    image?: string
  }
}
