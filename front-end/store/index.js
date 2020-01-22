import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducer'

function createMiddlewares () {
  let middlewares = [
    thunkMiddleware
  ]
  return middlewares
}

export default (initialState = {}, context) => {
  let middlewares = createMiddlewares()
  let state = initialState
  return createStore(
    rootReducer,
    state,
    compose(applyMiddleware(...middlewares))
  )
}
