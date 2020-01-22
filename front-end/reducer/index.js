import { combineReducers } from 'redux'
import reducerTemplate from './common'

const reducers = {}
const appModules = ['weather-report']

appModules.forEach(moduleName => {
  reducers[moduleName] = reducerTemplate(moduleName)
})

export default combineReducers(reducers)
