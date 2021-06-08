const conn = require('../database/db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const user = conn.db.get('staff').find({ username: username  }).value();
  if(user){
    const validPassword = bcrypt.compareSync(password, user.password);
    console.log(validPassword);
    if(!validPassword){
      res.status(401).json({
          status: 'failure',
          message: "Invalid credentials"
      });
    }else{
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ success: true, token: token });
    }
  }else{
    res.status(401).json({
        status: 'failure',
        message: "Invalid credentials"
    });
  }
}

function getLoginStatus(request, response) {
  const token = request.header('Authorization').replace('Bearer ', '');

  let result = { loggedIn: false };

  if (token) {
    const tokenVerified = jwt.verify(token, config.secret);

    console.log('JWT Verify:', tokenVerified);

    if (tokenVerified) {
      result.loggedIn = true;
    }
  }

  response.json(result);
}

exports.login = login;
exports.getLoginStatus = getLoginStatus;
