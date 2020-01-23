import React, { Fragment } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import WeatherData from '../weather-data'

const Report = (props) => {
  if(props.isLoading){
    return (
      <div>
        {'...'}
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
      <div>
        {'Failed to fetch data :('}
      </div>
    )
  }

  return (
    <Fragment />
  )

}

export default Report