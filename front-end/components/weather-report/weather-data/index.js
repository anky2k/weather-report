import React, { Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
/** @jsx jsx */ import { jsx, css } from '@emotion/core'

const sectionStyle = {
  'margin-top': '5px'
}

const containerStyle = {
  'display': 'flex',
  'flex-flow': 'column'
}

const renderLocation = (location = {}) => {
  const cityStyle = {        
    'font-size': 'x-large'
  }

  const regionStyle = {
    'font-size': 'small'
  }

  const timeStyle = {
    'font-style': 'italic'
  }


  return (
    <div css={sectionStyle}>
      <Container fluid>
      <Row>
        <Col>
          <div css={containerStyle}>
            <div css={cityStyle}>
              <span><i className="fas fa-map-marker-alt"></i></span>
              <span>{location.city}</span>
              <span css={regionStyle}>
                {`${location.region}, ${location.country}`}
              </span>
            </div>                        
            <div css={timeStyle}>              
              <span>
                {new Date().toLocaleString('en-US', {
                  timeZone: location.timezone_id
                })}
              </span>              
            </div>
          </div>
        </Col>        
      </Row>
    </Container>
    </div>
  )
}

const renderForeCast = (forecasts= []) => {
  return (
    <div css={sectionStyle}>
      {JSON.stringify(forecasts)}
    </div>
  )
}

const currentObservation = (currentObservation= {}) => {
  return (
    <div css={sectionStyle}>
      {JSON.stringify(currentObservation)}
    </div>
  )
}

const WeatherData = (props) => {
  const { weatherData = {} } = props
  const {location = {}, current_observation = {}, forecasts = [] } = weatherData
  return (
    <div css={containerStyle}>
      {renderLocation(location)}
      {/* {currentObservation(current_observation)}
      {renderForeCast(forecasts)} */}
    </div>
  )
}

export default WeatherData