/* eslint-disable prettier/prettier */
export interface LoginRequestData {
  email: string
  password: string
}
export interface getResponseLogin {
  user: {
    username: string
    email: string
    token: string
  }
}
