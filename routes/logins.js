// declare axios for making http requests
const axios = require('axios');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require(__dirname + '/../config.js');

function post(req, res, next) {

    var email = req.body.email;

    console.log('Executing GET ', `${config.api_ords}/tdc_users/?q={"email":"${email}"}`);

    axios.get(`${config.api_ords}/tdc_users/?q={"email":"${email}"}`)
        .then(response => {
            var user = response.data.items[0];

            console.log(response);
            
            bcrypt.compare(req.body.password, user.password, function (err, pwMatch) {
                var payload;

                if (err) {
                    return next(err);
                }

                if (!pwMatch) {
                    res.status(401).send({ message: 'Invalid email or password.' });
                    return;
                }

                payload = {
                    sub: user.email,
                    role: user.role
                };
    
                res.status(200).json({
                    user: user,
                    token: jwt.sign(payload, config.jwtSecretKey, { expiresInMinutes: 60 })
                });
            });

        })
        .catch(error => {
            console.log('ORDS error: ', error);
            res.status(500).send(error)
        });
}

module.exports.post = post;
