var express = require('express');
var models = require('../models');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');
/* GET home page. */
router.get('/', function(req, res, next) {
  let cookies = req.cookies;
  models.requestchat.findAll({
    where: {
      receiveruserID : cookies.activate
    }
  }).then( requestlist => {
    models.chatroom.findAll({
      where: {
        $or: {
          user1 : cookies.activate,
          user2 : cookies.activate
        }
      }
    }).then( chatlist => {
      models.register.findAll({
        where: {
            userID : cookies.activate,
        }
      }).then( registerlist => {

        models.requestchat.findAll({
          where: {
              senderuserID : cookies.activate,
          }
        }).then( myrequestlist => {
          res.render('activate', {
            myrequestlist : myrequestlist,
            schedules: registerlist,
            chatlist : chatlist,
            requestlist : requestlist,
            userID : cookies.activate
          });
        })
        .catch( err => {
          console.log(err);
        });
        
      })
      .catch( err => {
        console.log(err);
      });
    })
    .catch( err => {
      console.log(err);
    });
  })
  .catch( err => {
    console.log(err);
  });
});

router.get('/findtrip', function(req, res, next){
  let cookies = req.cookies;
  let body = req.body;
  var parsedUrl = url.parse(req.url);
  var qObj = querystring.parse(parsedUrl.query);

  var isEmpty = function(obj) {
    return Object.keys(obj).length === 0;
  }
  if(isEmpty(qObj)) {
    res.render("activate/findtrip", {
      userID : cookies.activate,
    })
  } else {
  var user;
  let params = new Object();
  models.user.find({
    where: {userID : cookies.activate}
  })
  .then(result=> {
    
    user=result.dataValues;
    if(qObj.borough!='전체') {
      params = Object.assign(params, {
        borough:qObj.borough
      });
    }
    if(qObj.sex!='무관') {
      params = Object.assign(params, {
        sex:qObj.sex
      });
    }
    models.register.findAll({
      //res.send(result);
      where: Object.assign(params, {
        
        userID: {
          $not:cookies.activate
        },
        $and: {
          age: {$gte:qObj.startage},
          age: {$lte:qObj.endage}
        },
        targetendage: {$gte:user.age},
        targetstartage: {$lte:user.age},
        targetsex: {
          $in: ['무관',user.sex]
        },
        $or: [
          {
            $and: {
              startdate: {$lte:qObj.startdate},
              enddate: {$gte:qObj.startdate}
            }
          },
          {
            $and: {
              startdate: {$lte:qObj.enddate},
              enddate: {$gte:qObj.enddate}
            }
          },
          {
            $and: {
              startdate: {$gte:qObj.startdate},
              enddate: {$lte:qObj.enddate}
            }
          }
        ],
        city: qObj.city,
      })
    })
    .then(result=> {
      var n = [];
      var k = {};

      result.forEach( function(x,index) {
        console.log(index);
        models.requestchat.findAll({
          where: {
            $and:{
              receiveruserID:x.dataValues.userID,
              pnum:x.dataValues.id
            }
          }
        }).then(rArr=>{
          if(rArr.length==0) {
            n.push(x);
            
          }
          k['value']=n;
          //res.setHeader('Content-Type', 'json');
        }).catch(err=>{
          console.log(err);
        });
      })

      //console.log(result);
      setTimeout(function(){
        console.log(n);
        res.render("activate/findtrip", {
          userID : cookies.activate,
          schedules: n
        });
      }, 5);

    })
    .catch( err=> {
      console.log(err);
    });
  })
  .catch( err=> {
    console.log(err);
  });
  }
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

router.post('/findtrip/requestchat', function(req, res, next) {
  let cookies = req.cookies;
  let body = req.body;
  //console.log(cookies);
  //res.send(body);
      models.user.find({
        where: { userID : cookies.activate}
      }).then( result => {
        //res.send(result);
        models.requestchat.create({
          pnum: body.pnum,
          senderuserID: result.userID,
          senderage: result.age,
          sendersex: result.sex,
          receiveruserID:body.userID,
          city:body.city,
          borough:body.borough,
          comment:body.comment,
          startdate:body.startdate,
          enddate:body.enddate,
        })
        .then( result => {
          res.redirect('/');
        })
        .catch( err=> {
          console.log(err);
        });
      }).catch( err=> {
        console.log(err);
      })
})

router.post('/acceptchat', function(req, res, next) {
  let cookies = req.cookies;
  let body = req.body;

  models.requestchat.find({
    where: {pnum : body.pnum}
  }).then( result => {
    models.chatroom.create({
      roomnumber: result.pnum,
      user1: result.senderuserID,
      user2: result.receiveruserID,
      roomname: result.city+'/'+result.borough+'/'+result.startdate+'~'+result.enddate+'/'+result.comment
    })
    .then( result => {
      models.requestchat.destroy({
        where: {pnum : body.pnum}
      }).then( result => {
        res.redirect('/');
      })
      .catch( err => {
        console.log(err);
      });
    })
    .catch( err=> {
      console.log(err);
    });
  }).catch( err=> {
    console.log(err);
  });
});
router.post('/cancelchat', function(req, res, next) {
  let cookies = req.cookies;
  let body = req.body;

  models.requestchat.destroy({
    where: {pnum : body.pnum}
  }).then( result => {
    res.redirect('/');
  })
    .catch( err => {
      console.log(err);
  });
});

router.post('/denychat', function(req, res, next) {
  let cookies = req.cookies;
  let body = req.body;

  models.requestchat.destroy({
    where: {pnum : body.pnum}
  }).then( result => {
    res.redirect('/');
  })
    .catch( err => {
      console.log(err);
  });
});

router.post('/delchat', function(req, res, next) {
  let cookies = req.cookies;
  let body = req.body;

  models.chatroom.destroy({
    where: {roomnumber : body.pnum}
  }).then( result => {
    models.chatmsg.destroy({
      where: {roomnumber : body.pnum}
    }).then( chat => {
      res.redirect('/');
    }).catch( err=> {
      console.log(err);
    })
  }).catch( err => {
      console.log(err);
  });
});

router.post('/delregchat', function(req, res, next) {
  let cookies = req.cookies;
  let body = req.body;

    models.register.destroy({
      where: {id : body.id}
    }).then( chat => {
      res.redirect('/');
    }).catch( err=> {
      console.log(err);
    })

});

module.exports = router;
