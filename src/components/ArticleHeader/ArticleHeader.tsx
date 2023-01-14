import React from 'react'

import style from './ArticleHeader.module.scss'

const ArticleHeader = () => {
  return (
    <>
      <header className={style.header_container}>
        <a href="/">Realworld Blog</a>
        <div className={style.buttons_wrapper}>
          <a href="#">Sign In</a>
          <a href="#">Sign Up</a>
        </div>
      </header>
    </>
  )
}
export default ArticleHeader
