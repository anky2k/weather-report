import React, { Fragment } from 'react'
import { Col, Container, Row, Card, ListGroup, Table } from 'react-bootstrap';
/** @jsx jsx */ import { jsx, css } from '@emotion/core'

const sectionStyle = {
  'margin-top': '10px'
}

const containerStyle = {
  'display': 'flex',
  'flex-flow': 'column'
}

const capitalizeFirstChar  = (inputString = '') => {
  const str = inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
  return str.replace('.', '')
}

const getWeatherConditionIcon = (condition = '') => {
  condition = condition ? (condition.replace(/ /g, '').toLowerCase() || '') : ''
  if(condition.indexOf('cloud') >= 0 || condition.indexOf('cloudy') >= 0) {
    return (
      <span className='wi wi-day-cloudy'></span>
    )
  }

  if(condition.indexOf('sun') >= 0 || condition.indexOf('sunny') >= 0) {
    return (
      <span className='wi wi-day-sunny'></span>
    ) 
  }

  if(condition.indexOf('rain') >= 0 || condition.indexOf('rainy') >= 0 || condition.indexOf('shower') >= 0) {
    return (
      <span className='wi wi-day-rain'></span>
    )  
  }

  if(condition.indexOf('snow') >= 0 || condition.indexOf('snowy') >= 0) {
    return (
      <span className='wi wi-day-snow'></span>
    )  
  }

  return (
    <span></span>
  )  
}

const renderForeCast = (forecasts= []) => {
  return (
    <div css={sectionStyle}>
      <Table striped bordered hover responsive size={'sm'} css={css`
        margin-left: 10px;
        margin-right: 10px;
      `}>
        <tbody>
        {
          forecasts.map( (forecastItem, index)=> {
            let formattedDate = new Date(forecastItem.date * 1000)
            formattedDate =  `${formattedDate.getFullYear()} / ${formattedDate.getMonth() + 1} / ${formattedDate.getDate()}` 
            return (
              <tr key={index}>
                <td>{`${formattedDate} (${forecastItem.day})`}</td>
                <td>
                  {getWeatherConditionIcon(forecastItem.text)}
                  <span css={css`padding-left: 5px;`} >{forecastItem.text}</span>
                </td>
                <td>
                  <span>&darr;</span>
                  <span>{forecastItem.low}</span>
                  <span>&#8451;</span>
                  <span>{' - '}</span>  
                  <span>&uarr;</span>
                  <span>{forecastItem.high}</span>
                  <span>&#8451;</span>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
    </div>
  )
}

const currentObservation = (location = {}, currentObservation= {}) => {  
  return (
    <div className="card weather-card">
      <div className="card-body pb-3">
        <span css={css`
            display: flex;
            flex-flow: row;
            justify-content: unset;
        `}>
          <i className='wi wi-thermometer'></i>
          <span css={css`
                            padding-left: 5px;
                            padding-right: 5px;
                          `}></span>
          <h4 className="card-title font-weight-bold">{location.city}</h4>
        </span>
        <p className="card-text">{`${new Date().toLocaleString('en-US', {
                  timeZone: location.timezone_id
        })} - ${(currentObservation.condition && currentObservation.condition.text) || ''}`}</p>
        <div css={css`
            display: flex;
            flex-flow: row;
        `}>
              <div css={css`
                display: flex;
                flex-flow: column;
                justify-content: 'space-between';
              `}>          
                  <div className="d-flex">
                    <p className="display-1 degree">{`${(currentObservation.condition && currentObservation.condition.temperature)}`}</p>                 
                    <span>&#8451;</span>
                  </div>    
                  <div>
                      <div>
                          <span title="Sunrise" className='wi wi-sunrise'></span>
                          <span title="Sunrise" css={css`
                            padding-left: 5px;
                          `}>
                            {`${currentObservation['astronomy'] && currentObservation['astronomy']['sunrise']}`}
                          </span>
                          <span css={css`
                            padding-left: 5px;
                            padding-right: 5px;
                          `}></span>
                          <span title="Sunset" className='wi wi-sunset'></span>
                          <span title="Sunset" css={css`
                            padding-left: 5px;
                          `}>
                            {`${currentObservation['astronomy'] && currentObservation['astronomy']['sunset']}`}
                          </span>
                          <span css={css`
                            padding-left: 5px;
                            padding-right: 5px;
                          `}></span>
                          <span title="Wind Speed" className='wi wi-day-windy'></span>
                          <span title="Wind Speed" css={css`
                            padding-left: 5px;
                          `}>{`${currentObservation['wind'] && currentObservation['wind']['speed']} m/s`}</span>
                          <span css={css`
                            padding-left: 5px;
                            padding-right: 5px;
                          `}></span>
                          <span title="Humidity" className='wi wi-humidity'></span>
                          <span title="Humidity" css={css`
                            padding-left: 5px;
                          `}>{`${currentObservation['atmosphere'] && currentObservation['atmosphere']['humidity']}`}</span>
                      </div>
                  </div>            
              </div>
              <div>           
              </div>              
          </div>            
      </div>  
    </div>
  )
}

const WeatherData = (props) => {
  const { weatherData = {} } = props
  const {location = {}, current_observation = {}, forecasts = [] } = weatherData
  return (    
    <div css={containerStyle}>
      {currentObservation(location, current_observation)}
      {renderForeCast(forecasts)}
    </div>
  )
}

export default WeatherData