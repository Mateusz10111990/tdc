// declare axios for making http requests
const axios = require('axios');

var config = require(__dirname + '/../config.js');

function get(req, res, next) {
  console.log('Executing GET ', `${config.api_ords}/tdc_posts`);

  axios.get(`${config.api_ords}/tdc_posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
}

module.exports.get = get;
