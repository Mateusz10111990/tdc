// declare axios for making http requests
const axios = require('axios');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var config = require(__dirname + '/../config.js');
 
function post(req, res, next) {
    var user = {
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,        
        role: req.body.role
    };

    var unhashedPassword = req.body.password;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
 
        bcrypt.hash(unhashedPassword, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
 
            user.password = hash;
 
            insertUser(user, function(err, user) {
                var payload;
 
                if (err) {
                    return next(err);
                }
 
                payload = {
                    sub: user.email,
                    role: user.role
                };
 
                res.status(200).json({
                    user: user,
                    token: jwt.sign(payload, config.jwtSecretKey, {expiresInMinutes: 60})
                });
            });
        });
    });
}
 
module.exports.post = post;
 
function insertUser(user, cb) {

    console.log('Executing POST ', `${config.api_ords}/tdc_users`);

    axios.post(`${config.api_ords}/tdc_users/`, user)
        .then(function (res) {
            cb(null, {
                id: res.data.id,
                email: res.data.email,
                role: res.data.role
            });
        })
        .catch(function (err) {
            console.log(err);
            cb(err);
        });

}
