// declare axios for making http requests
const axios = require('axios');

var config = require(__dirname + '/../config.js');

function get(req, res, next) {
  let authorId = req.params.author_id;
  
  console.log('Executing GET ', `${config.api_ords}/todos?q={"author_id":${authorId}}`);

  axios.get(`${config.api_ords}/todos?q={"author_id":${authorId}}`)
    .then(todos => {
      res.status(200).json(todos.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
}

function post(req, res, next) {

  var todo = {
    author_id: req.body.author_id,
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority
  };

  console.log('Executing POST ', `${config.api_ords}/todos`);

  axios.post(`${config.api_ords}/todos/`, todo)
    .then(function (response) {
      console.log('POSTED');
      let newid = response.data.id;
      res.status(200).json({
        success: true, message: "Added successfully.", id: newid
      });
    })
    .catch(function (err) {
      console.log(err);
      return next(err);
    });
}

function remove(req, res, next) {

  let todoId = req.params.todo_id;
  
  console.log('Executing DELETE ', `${config.api_ords}/tdc_todos/?q={"id":${todoId}}`);

  axios.delete(`${config.api_ords}/todos/?q={"id":${todoId}}`)
    .then(function (response) {
      console.log('DELETED');
      res.status(200).json({
        success: true, message: "Deleted successfully"
      });
    })
    .catch(function (err) {
      console.log(err);
      return next(err);
    });
}

module.exports.get = get;
module.exports.post = post;
module.exports.delete = remove;
