/* eslint-disable prettier/prettier */
import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, useHistory, useParams } from 'react-router-dom'

import * as actions from '../../redux/actions'
import { RootState, useAppSelector } from '../../redux/root-reduser'

import style from './ArticleHeader.module.scss'

interface HeaderType {
  state: RootState
  setLoginIn: () => void
  setLogOut: () => void
}

const ArticleHeader: FC<HeaderType> = ({ setLoginIn, setLogOut }) => {
  const hist = useHistory()
  const defaultImg = '../../assets/img/Standart.svg'
  const currentUser = useAppSelector((state) => state.AutorizationReduser.user)
  const isLogedIn = useAppSelector((state) => state.AutorizationReduser.isLoged)

  useEffect(() => {
    setLoginIn()
  }, [])

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
                  <Link className={style.create_btn} to="/profile">
                    Create article
                  </Link>
                  <p>{currentUser?.user.username}</p>
                  <img src={defaultImg} />
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
