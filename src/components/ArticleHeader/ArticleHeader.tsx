import React from 'react'
import { Link } from 'react-router-dom'

import style from './ArticleHeader.module.scss'

const ArticleHeader = () => {
  return (
    <>
      <header className={style.header_container}>
        <a href="/">Realworld Blog</a>

        <div className={style.buttons_wrapper}>
          <Link to="sign-in">Sign In</Link>
          <Link to="sign-up">Sign Up</Link>
        </div>
      </header>
    </>
  )
}
export default ArticleHeader
