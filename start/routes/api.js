var express = require('express');
var router = express.Router();

// used for routes that must be authenticated
function isAuthenticated (req, res, next) {

    //allow all get request methods
    if(req.method == "GET") {
        return next();
    }

    //allow any requests where the user is authenticated
    if(req.isAuthenticated()) {
        return next();
    }

    //for anything else, redirect to login page
    return res.redirect('/#login');
};

// register the authentication middleware
router.use('/steps', isAuthenticated);

// api for all steps
router.route('/steps')

  // create a new step
  .post(function(req, res) {
      res.send({message: "TODO create new step"});
  })

  // return all steps
  .get(function(req, res) {
      res.send({message: "TODO get all steps in the database"});
  })

// api for an individual step
router.route('/steps/:id')

  // update a step
  .put(function(req, res) {
      return res.send({message: "TODO modify an existing step by using param " + req.param.id })
  })

  // get specific step
  .get(function(req, res) {
      return res.send({message: "TODO get an existing step by using param " + req.param.id })
  })

  // update a step
  .delete(function(req, res) {
      return res.send({message: "TODO delete an existing step by using param " + req.param.id })
  });

module.exports = router;
