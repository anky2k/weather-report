import React from 'react'
import Head from 'next/head'
import ConWeatherReport from '../container/weather-report'
import { withRedux } from '../libs/redux-enabler'

const Home = (props) => {
  const { store } = props
  return (  
    <div className='bg'>
      <Head>
        <title>Home</title>
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
          integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
          crossorigin='anonymous'
        />        
        <link rel='icon' href='/favicon.ico' />
      </Head>        
        <div className='hero'>     
            <h1 align='center'>{"how's the weather like in...."}</h1>
            <ConWeatherReport />
        </div>        
      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }    

        img.bg {
          /* Set rules to fill background */
          min-height: 100%;
          min-width: 1024px;
          
          /* Set up proportionate scaling */
          width: 100%;
          height: auto;
          
          /* Set up positioning */
          position: fixed;
          top: 0;
          left: 0;
        }
        
        @media screen and (max-width: 1024px) { /* Specific to this particular image */
          img.bg {
            left: 50%;
            margin-left: -512px;   /* 50% */
          }
        }        
      `}</style>
    </div>
  )
}

export default withRedux(Home)