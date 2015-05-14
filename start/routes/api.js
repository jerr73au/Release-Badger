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
      //res.send({message: "TODO get all steps in the database"});
      var steps = [
          { number: '1', process: 'Take database backups', done: 'false', time_completed: '' },
          { number: '2', process: 'Place Sitefinity in Maintenance mode', done: 'false', time_completed: '' },
          { number: '3', process: 'Pre Solution Depolyment - Remove CRM HTTPS Binding', done: 'false', time_completed: '' },
          { number: '4', process: 'Production CRM Deployment', done: 'false', time_completed: '' },
          { number: '5', process: 'Production Intranet Deployment', done: 'false', time_completed: '' },
          { number: '6', process: 'Production DMZ Deployment', done: 'false', time_completed: '' },
          { number: '7', process: 'CRM Manual Steps', done: 'false', time_completed: '' },
          { number: '8', process: 'Post Release Confirmation', done: 'false', time_completed: '' },
          { number: '9', process: 'Communicate to team members that release is complete', done: 'false', time_completed: '' }
      ];
      res.send(200, steps);
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
