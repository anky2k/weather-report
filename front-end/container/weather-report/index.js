import WeatherReport from '../../components/weather-report'
import { connect } from 'react-redux'
import { getWeatherData } from '../../actions/weather-report'
import { Fragment } from 'react'

function mapStateToProps (state) {
  return state
}

function ConWeatherReport (props) {
  console.log(props)
  return (
    <Fragment>
      <WeatherReport
        {...props}
       />
    </Fragment>
  )  
}

export default connect(mapStateToProps, {
  getWeatherData
})(ConWeatherReport)