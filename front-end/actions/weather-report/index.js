import { updateFetchTemplate, errorFetchTemplate } from '../common'
const _stateNameSpace = 'weather-report'
const updateFetch = updateFetchTemplate(_stateNameSpace)
const errorFetch = errorFetchTemplate(_stateNameSpace)

const _getWeatherData = async (zipcodes = '') => {
  if(!zipcodes) {
    return {}
  }
    let response = await fetch(`//localhost:3500/v1/weather-data?zip=${zipcodes}`)
  if (response.ok) { // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let json = await response.json()
    return json
  } else {
    return []
  }
}

export function getWeatherData (zipcodes = '', stateNameSpace = _stateNameSpace) {
  return async (dispatch, getState) => {
    let response = {}
    try {      
      response = await _getWeatherData(zipcodes)
      dispatch(updateFetch(response, stateNameSpace))
    } catch (err) {
      console.log(err)
      dispatch(errorFetch(err, stateNameSpace))
    }
  }
}