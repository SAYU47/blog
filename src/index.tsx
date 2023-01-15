import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { rootReduser } from './redux/root-reduser'
import App from './components/App/App'

const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)))
// eslint-disable-next-line prettier/prettier
const root = ReactDOM.createRoot(
  // eslint-disable-next-line prettier/prettier
  document.getElementById('root') as HTMLElement
)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
