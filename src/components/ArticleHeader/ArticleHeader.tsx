/* eslint-disable prettier/prettier */
import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '@store/actions'
import { RootState, useAppSelector } from '@store/root-reduser'

import style from './ArticleHeader.module.scss'

interface HeaderType {
  state: RootState
  setLoginIn: () => void
  setLogOut: () => void
}

const ArticleHeader: FC<HeaderType> = ({ setLoginIn, setLogOut }) => {
  const defaultImg = '../../assets/img/Standart.svg'
  const currentUser = useAppSelector((state) => state.AutorizationReduser.user)
  const isLogedIn = useAppSelector((state) => state.AutorizationReduser.isLoged)

  useEffect(() => {
    setLoginIn()
  }, [])
  const setImage = currentUser?.user.image ? currentUser?.user.image : defaultImg
  return (
    <>
      <header className={style.header_container}>
        <a href="/">Realworld Blog</a>
        {!isLogedIn ? (
          <div className={style.buttons_wrapper}>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        ) : (
          <>
            <div className={style.user_wrapper}>
              <section className={style.autor_info}>
                <div className={style.autor_info_container}>
                  <Link className={style.create_btn} to="/new-article">
                    Create article
                  </Link>
                  <Link className={style.autor_link} to="/profile">
                    <p>{currentUser?.user.username}</p>
                    <img className={style.author_image} src={setImage} />
                  </Link>
                </div>
              </section>
              <button className={style.logout_btn} onClick={setLogOut}>
                Log Out
              </button>
            </div>
          </>
        )}
      </header>
    </>
  )
}

const mapStatetoProps = (state: RootState) => {
  return { state }
}
export default connect(mapStatetoProps, actions)(ArticleHeader)
