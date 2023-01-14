import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import ArticleHeader from '../ArticleHeader/ArticleHeader'
import ArticlesPage from '../ArticlesPage/ArticlesPage'
import MarkdownPage from '../MarkdownPage/MarkdownPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <ArticleHeader />
        <Route path="/" exact component={ArticlesPage} />
        <Route
          path="/articles/:slug"
          render={({ match }) => {
            const { slug } = match.params
            console.log(slug)
            return <MarkdownPage slug={slug} />
          }}
        />
      </div>
      <Redirect to="/" />
    </Router>
  )
}

export default App
