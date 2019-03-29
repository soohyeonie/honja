var express = require('express');
var models = require('../models');
const crypto = require("crypto");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.cookies){
      console.log(req.cookies);
  }

  res.send("환영합니다 ~");
});

router.get('/login', function(req, res, next) {
  let session = req.session;

  res.render("user/login", {
      session : session
  });
});

router.post("/login", function(req,res,next){
  let body = req.body;

  models.user.find({
      where: {userID : body.userID}
  })
  .then( result => {
      let dbPassword = result.dataValues.password;

      let inputPassword = body.password;
      let salt = result.dataValues.salt;
      let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

      if(dbPassword === hashPassword){
          console.log("비밀번호 일치");
          res.cookie("activate", body.userID , {
            expires: new Date(Date.now() + 9000000),
            httpOnly: true
          });
          //res.render("activate/index");
          res.redirect("/activate");
      }
      else{
          console.log("비밀번호 불일치");
          res.redirect("/users/login");
      }
  })
  .catch( err => {
      console.log(err);
  });
});

router.get("/logout", function(req,res,next){
  res.clearCookie('sid');
  res.redirect("/users/login");
})

router.get('/sign_up', function(req, res, next) {
  res.render("user/signup");
});

router.post("/sign_up", function(req,res,next){
    let body = req.body;

    let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
    models.user.create({
        userID: body.userID,
        email: body.userEmail,
        password: hashPassword,
        name : body.name,
        age : body.age,
        sex : body.sex,
        salt : salt
    })
    .then( result => {
        res.redirect("/users/login");
    })
    .catch( err => {
        console.log(err)
    })
})

module.exports = router;
