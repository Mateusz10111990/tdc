const path = require('path');

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var auth = require(__dirname + '/routes/auth.js');
var posts = require(__dirname + '/routes/posts.js');
var todos = require(__dirname + '/routes/todos.js');
var users = require(__dirname + '/routes/users.js');
var logins = require(__dirname + '/routes/logins.js');
var app;
var router;
var port = process.env.PORT || 3000;

app = express();

app.use(morgan('combined')); //logger
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'public')));

// Init api on separate route
router = express.Router();

router.get('/posts', posts.get);
router.get('/todos/:author', auth(), todos.get);
//router.get('/todos', todos.get);
router.get('/todos2', auth('ADMIN'), todos.get);
router.post('/users', users.post);
router.post('/logins', logins.post);
router.post('/todos', auth(), todos.post);
router.delete('/todos/:todo_id',auth(), todos.delete);

app.use('/api', router);

// Catch all other routes and return the index file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function () {
    console.log('Web server listening on localhost:' + port);
});

process.on('unhandledRejection', (reason) => {
  console.log('UNHANDLED REJECTION. Reason: ' + reason);
});
