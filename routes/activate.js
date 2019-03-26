var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let cookies = req.cookies;

  res.render('activate/index', {
    userID : cookies.activate
  });
});
router.get('/index', function(req, res, next) {
  let cookies = req.cookies;
  //res.send(cookies);
  res.render('activate/index', {
    userID : cookies.activate
  });
});
router.get('/findtrip', function(req, res, next) {
  let cookies = req.cookies;
  //res.send(cookies);
  res.render('activate/findtrip', {
    userID : cookies.activate
  });
});
router.post('/findtrip', function(req, res, next){
  let cookies = req.cookies;
  let body = req.body;
  var user;
  let params = new Object();
  models.user.find({
    where: {userID : cookies.activate}
  })
  .then(result=> {
    user=result.dataValues;
    if(body.borough!='전체') {
      params = Object.assign(params, {
        borough:body.borough
      });
    }
    if(body.sex!='무관') {
      params = Object.assign(params, {
        sex:body.sex
      });
    }
    models.register.findAll({
      //res.send(result);
      where: Object.assign(params, {
        userID: {
          $not:cookies.activate
        },
        $and: {
          age: {$gte:body.startage},
          age: {$lte:body.endage}
        },
        targetendage: {$gte:user.age},
        targetstartage: {$lte:user.age},
        targetsex: {
          $in: ['무관',user.sex]
        },
        $or: [
          {
            $and: {
              startdate: {$lte:body.startdate},
              enddate: {$gte:body.startdate}
            }
          },
          {
            $and: {
              startdate: {$lte:body.enddate},
              enddate: {$gte:body.enddate}
            }
          },
          {
            $and: {
              startdate: {$gte:body.startdate},
              enddate: {$lte:body.enddate}
            }
          }
        ],
        city: body.city
      })
    })
    .then(result=> {
      res.render("activate/findtrip", {
        userID : cookies.activate,
        schedules: result
      });
    })
    .catch( err=> {
      console.log(err);
    });
  })
  .catch( err=> {
    console.log(err);
  });
  /*
  if(body.borough!='전체') {
    params = {
      borough:body.borough
    };
  }
  models.register.findAll({
    //res.send(result);
    where: Object.assign(params, {
      userID: {
        $not:body.userID
      },
      targetendage: {$gte:user.age},
      targetstartage: {$lte:user.age},
      targetsex:user.sex,
      $or: [
        {
          $and: {
            startdate: {$lte:body.startdate},
            enddate: {$gte:body.startdate}
          }
        },
        {
          $and: {
            startdate: {$lte:body.enddate},
            enddate: {$gte:body.enddate}
          }
        },
      ],
      city: body.city
    })
  })
  .then(result=> {
    res.render("activate/findtrip", {
      userID : cookies.activate,
      schedules: result
    });
  })
  .catch( err=> {
    console.log(err);
  });
  */
})

router.get('/registertrip', function(req, res, next) {
  let cookies = req.cookies;
  res.render('activate/registertrip', {
    userID : cookies.activate
  });
});

router.post('/registertrip', function(req, res, next) {
  let cookies = req.cookies;
  let body = req.body;
  models.user.find({
    where: {userID : cookies.activate}
  }).then( result => {
    //res.send(result);
    models.register.create({
      userID: result.userID,
      age: result.age,
      sex: result.sex,
      startdate: body.startdate,
      enddate: body.enddate,
      city:body.city,
      borough:body.borough,
      comment:body.comment,
      targetstartage:body.startage,
      targetendage:body.endage,
      targetsex:body.sex
    })
    .then( result => {
      res.redirect("registertrip");
    })
    .catch( err=> {
      console.log(err)
    });
  })
  .catch( err => {
    console.log(err);
  });
});
module.exports = router;
