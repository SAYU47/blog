import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import ArticleHeader from '../ArticleHeader/ArticleHeader'
import ArticlesPage from '../ArticlesPage/ArticlesPage'
import MarkdownPage from '../MarkdownPage/MarkdownPage'
import SignUp from '../Autorization/SignUp/SignUp'
import SignIn from '../Autorization/SignIn/SignIn'

import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <ArticleHeader />
        <Route path="/" exact component={ArticlesPage} />
        <Route
          exact
          path="/articles/:slug"
          render={({ match, history }) => {
            const { slug } = match.params
            return <MarkdownPage slug={slug} />
          }}
        />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
      </div>

      <Redirect to="/" />
    </Router>
  )
}

export default App
