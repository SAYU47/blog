import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import { useAppSelector } from '@store/root-reduser'
import ArticleHeader from '@components/ArticleHeader/ArticleHeader'
import ArticlesPage from '@components/ArticlesPage/ArticlesPage'
import MarkdownPage from '@components/MarkdownPage/MarkdownPage'
import SignUp from '@components/Autorization/SignUp.tsx/SignUp'
import SignIn from '@components/Autorization/SignIn/SignIn'
import EditProfile from '@components/EditProfile/EditProfile'
import MutateArticle from '@components/MutateArticle/MutateArticle'

import './App.css'

function App() {
  const user = useAppSelector((state) => state.AutorizationReduser.isLoged)
  return (
    <Router>
      <div className="App">
        <ArticleHeader />

        <Switch>
          <Route path="/" exact component={ArticlesPage} />
          <Route
            exact
            path="/articles/:slug"
            render={({ match }) => {
              const { slug } = match.params
              return <MarkdownPage slug={slug} />
            }}
          />
          <Route
            exact
            path="/articles/:slug/edit"
            render={({ match }) => {
              const { slug } = match.params
              return <MutateArticle slug={slug} />
            }}
          />
          <Route path="/sign-in" component={() => <SignIn />} />
          <Route path="/sign-up" render={() => <SignUp />} />
          {user ? <Route path="/profile" component={EditProfile} /> : <Redirect to="/sign-in" />}
          {user ? <Route path="/new-article" exact component={MutateArticle} /> : <Redirect to="/sign-in" />}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
