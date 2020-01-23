import React, { Fragment } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import WeatherData from '../weather-data'
import Spinner from 'react-bootstrap/Spinner'
/** @jsx jsx */ import { jsx, css } from '@emotion/core'

const Report = (props) => {
  if(props.isLoading){
    return (
      <div css={css`
        width: 100px;
        height: 100px;
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;          
        margin: auto;
      `}>
        <Spinner animation="grow" variant="dark" />
      </div>
    )
  }

  if(!props.isLoading && !props.error && props.data && props.data.length > 0){
    const {location = {}} = props.data[0]
    return (
      <Tabs active={location.city}>
      {
        props.data.map( (weatherData, index) => {
          return(
            <Tab key={index} eventKey={weatherData.location.city} title={weatherData.location.city}>
                <WeatherData weatherData={weatherData} />
            </Tab>        
          )          
        })        
      }        
      </Tabs>    
    )
  }  

  if(props.error) {
    return (
      <div css={css`
        width: 100px;
        height: 100px;
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;          
        margin: auto;
      `}>
        {'Failed to fetch data :('}
      </div>
    )
  }

  return (
    <Fragment />
  )

}

export default Report