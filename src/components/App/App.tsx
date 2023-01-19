import React, { useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import ArticleHeader from '../ArticleHeader/ArticleHeader'
import ArticlesPage from '../ArticlesPage/ArticlesPage'
import MarkdownPage from '../MarkdownPage/MarkdownPage'
import SignUp from '../Autorization/SignUp.tsx/SignUp'
import SignIn from '../Autorization/SignIn/SignIn'
import NewArticle from '../NewArticle/NewArticle'

import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <ArticleHeader />
        <Switch>
          <Route path="/" exact component={ArticlesPage} />
          <Route
            path="/articles/:slug"
            render={({ match }) => {
              const { slug } = match.params
              return <MarkdownPage slug={slug} />
            }}
          />
          <Route path="/sign-in" render={() => <SignIn />} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/profile" exact component={NewArticle} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
