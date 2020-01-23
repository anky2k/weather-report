# Weather Report

This project uses [yahoo weather api's](https://developer.yahoo.com/weather/documentation.html) to show weather report for different states in US
 
### Tech

Stack on the backend uses [fastify](https://www.fastify.io/) a [fast](https://www.fastify.io/benchmarks/) and low overhead web framework, for Node.js.

The front end is composed of the following

* [ReactJs](https://reactjs.org/) - A JavaScript library for building user interfaces.
* [create-next-app](https://github.com/zeit/create-next-app) - A quick starter for nextjs based apps.
* [emotionjs](https://github.com/emotion-js/emotion) - css in js solution i love.
* [react-bootstrap](https://react-bootstrap.github.io/) - bootsrapped components for react.
* [redux](https://redux.js.org/) - a flux pattern based state manager

### Installation

Clone the repo (needs nodejs 8 or above)
```sh
$ git clone https://github.com/anky2k/weather-report.git
```

Move to the weather-report folder
```sh
$ cd weather-report
```

Here we have back-end and front-end apps, will start by firing up the backend first. We need to install dependancies and start the server

```sh
$ cd back-end
$ npm i
$ pm2 start ./server
```

Once the server has started we can now start the webapp, head back to the git root folder and move to the front-end folder

```sh
$ cd ..
$ cd front-end
$ npm i
$ npm run build
$ npm run start
```

navigate to http://localhost:3000