import React, { useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import { useAppSelector } from '../../redux/root-reduser'
import ArticleHeader from '../ArticleHeader/ArticleHeader'
import ArticlesPage from '../ArticlesPage/ArticlesPage'
import MarkdownPage from '../MarkdownPage/MarkdownPage'
import SignUp from '../Autorization/SignUp.tsx/SignUp'
import SignIn from '../Autorization/SignIn/SignIn'
import EditProfile from '../EditProfile/EditProfile'
import CreateArticle from '../CreateArticle/CreateArticle'
import EditArticle from '../EditArticle/EditArticle'

import './App.css'

function App() {
  // const history = useHistory()
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
              return <EditArticle slug={slug} />
            }}
          />
          <Route path="/sign-in" component={() => <SignIn />} />
          <Route path="/sign-up" render={() => <SignUp />} />
          {user ? <Route path="/profile" component={EditProfile} /> : <Redirect to="/sign-in" />}
          {user ? <Route path="/new-article" exact component={CreateArticle} /> : <Redirect to="/sign-in" />}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
