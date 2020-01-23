const OAuth = require('oauth')

const weatherData = async (fastify, options = {}) => {    
  // App ID
// Cch43B6g
// Client ID (Consumer Key)
// dj0yJmk9YXZnYmgzUUplcng3JmQ9WVdrOVEyTm9ORE5DTm1jbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTQx
// Client Secret (Consumer Secret)
// e3db0da7c90dc9a001a61d0f2873f6fce1eac403

  const weatherApi = async (zipcode = '') => {
    if(!zipcode) {
      return {}
    }
    const header = {
      "X-Yahoo-App-Id": "Cch43B6g"
    }
    const request = new OAuth.OAuth(
        null,
        null,
        'dj0yJmk9YXZnYmgzUUplcng3JmQ9WVdrOVEyTm9ORE5DTm1jbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTQx',
        'e3db0da7c90dc9a001a61d0f2873f6fce1eac403',
        '1.0',
        null,
        'HMAC-SHA1',
        null,
        header
    );
    return new Promise( (resolve, reject) => {
        request.get(
          `https://weather-ydn-yql.media.yahoo.com/forecastrss?woeid=${zipcode}&format=json`,
          null,
          null,
          function (err, data, result) {
              if (err) {
                  reject(err)
              } else {
                  resolve(JSON.parse(data))
              }
          }
        );
    });
  }

  fastify.get('/weather-data', Object.assign(options), async (request, reply) => {
    let weatherData = {}
    const { query = {} } = request
    const { zip = '' } = query
    if(!zip) {
      reply.code(412).send({ 'error': 'Please pass zipcode(s)' })
      return
    }
    try {
      const apis = []
      const zipCodes = zip.split(',')
      zipCodes.forEach(zipCode => {
        apis.push(weatherApi(zipCode))
      });
      weatherData = await Promise.all(apis)
    } catch (e) {
      reply.code(404).send({'error': 'Couldnot fetch weather details'})
      return
    }    
    reply.code(200).send({'payload': weatherData})
  })
}

module.exports = weatherData

//mock
// {
//   payload: [
//   "{"location":{"woeid":2502265,"city":"Sunnyvale","region":" CA","country":"United States","lat":37.371609,"long":-122.038254,"timezone_id":"America/Los_Angeles"},"current_observation":{"wind":{"chill":54,"direction":135,"speed":2.49},"atmosphere":{"humidity":91,"visibility":9.82,"pressure":29.94,"rising":0},"astronomy":{"sunrise":"7:19 am","sunset":"5:22 pm"},"condition":{"text":"Cloudy","code":26,"temperature":54},"pubDate":1579687200},"forecasts":[{"day":"Wed","date":1579680000,"low":50,"high":60,"text":"Mostly Cloudy","code":28},{"day":"Thu","date":1579766400,"low":45,"high":60,"text":"Mostly Cloudy","code":28},{"day":"Fri","date":1579852800,"low":46,"high":61,"text":"Mostly Cloudy","code":28},{"day":"Sat","date":1579939200,"low":49,"high":63,"text":"Mostly Cloudy","code":28},{"day":"Sun","date":1580025600,"low":47,"high":58,"text":"Showers","code":11},{"day":"Mon","date":1580112000,"low":45,"high":56,"text":"Scattered Showers","code":39},{"day":"Tue","date":1580198400,"low":45,"high":59,"text":"Rain","code":12},{"day":"Wed","date":1580284800,"low":46,"high":58,"text":"Mostly Cloudy","code":28},{"day":"Thu","date":1580371200,"low":46,"high":61,"text":"Mostly Cloudy","code":28},{"day":"Fri","date":1580457600,"low":45,"high":62,"text":"Mostly Cloudy","code":28}]}",
//   "{"location":{"woeid":902,"city":"Lotbiniere","region":" QC","country":"Canada","lat":46.613819,"long":-71.945419,"timezone_id":"America/Montreal"},"current_observation":{"wind":{"chill":10,"direction":0,"speed":1.86},"atmosphere":{"humidity":85,"visibility":10.0,"pressure":29.8,"rising":0},"astronomy":{"sunrise":"7:21 am","sunset":"4:34 pm"},"condition":{"text":"Snow Showers","code":14,"temperature":10},"pubDate":1579687200},"forecasts":[{"day":"Wed","date":1579669200,"low":6,"high":27,"text":"Snow","code":16},{"day":"Thu","date":1579755600,"low":21,"high":30,"text":"Snow","code":16},{"day":"Fri","date":1579842000,"low":14,"high":27,"text":"Mostly Cloudy","code":28},{"day":"Sat","date":1579928400,"low":16,"high":27,"text":"Mostly Cloudy","code":28},{"day":"Sun","date":1580014800,"low":20,"high":26,"text":"Mostly Cloudy","code":28},{"day":"Mon","date":1580101200,"low":11,"high":22,"text":"Partly Cloudy","code":30},{"day":"Tue","date":1580187600,"low":4,"high":22,"text":"Partly Cloudy","code":30},{"day":"Wed","date":1580274000,"low":14,"high":25,"text":"Partly Cloudy","code":30},{"day":"Thu","date":1580360400,"low":14,"high":28,"text":"Partly Cloudy","code":30},{"day":"Fri","date":1580446800,"low":8,"high":27,"text":"Snow","code":16}]}",
//   "{"location":{},"current_observation":{},"forecasts":[]}"
//   ]
//   }