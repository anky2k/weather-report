import React, { Fragment, useState } from "react"
/** @jsx jsx */ import { jsx, css } from '@emotion/core'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

const listContainer = {
  'margin-top': '20px',
  'display': 'flex',
  'justify-content': 'center'
}

const options = [
  { label: 'SunnyVale', value: 2502265},
  { label: 'California', value: 902},
  { label: 'Loggieville', value: 889}
];

const WeatherReport = (props) => {
  const [zipCodes, setZipCodes] = useState('')

  const handleChange = (selectedItem = [])  => {
    let zipCodes = ''
    selectedItem.forEach( (item) => {
      zipCodes = `${zipCodes}${item.value},`
    })        
    setZipCodes(zipCodes.substring(0, zipCodes.length - 1))
  }

  const onFecthData = (e)  => {
    if(!zipCodes){
      alert('Please select a city')
    }
    props.getWeatherData(zipCodes)
  }

  return (
    <div>
    <div css={listContainer}>
        <div>
          <ReactMultiSelectCheckboxes 
           onChange={handleChange}
          placeholderButtonLabel={'Select...'}
          options={options} />
        </div>
        <div css={css`
          padding-left: 20px;
        `}> 
          <button 
            onClick={onFecthData}
            css={css`
            	box-shadow:inset 0px 1px 0px 0px #ffffff;
              background:linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
              background-color:#ffffff;
              border-radius:6px;
              border:1px solid #dcdcdc;
              display:inline-block;
              cursor:pointer;
              color:#666666;
              font-family:Arial;
              font-size:15px;
              font-weight:bold;
              padding:10px 29px;
              text-decoration:none;
              text-shadow:0px 1px 0px #ffffff;
              &:hover {
              background:linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
              background-color:#f6f6f6;
            }
            &:active {
              position:relative;
              top:1px;
            }
          `}>Fetch</button>                 
        </div>     
      </div>        
    </div>
  )
}

export default WeatherReport