var express = require('express');
var router = express.Router();
var steps = [];

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
      console.log('create new step');
      steps = [
          {
            number: '1', process: 'Take database backups', done: 'true', time_completed: '',
            sub_steps: [
              { number: '1', process: 'Log onto the Terminal Services Jump Host as a user with local administrator privileges' },
              { number: '2', process: 'Edit the web.config located in D:\inetpub\wwwroot\sitefinity' },
              { number: '3', process: 'Change the following setting from X to Y' },
              { number: '4', process: 'Update fiig.config by setting the maintenance datetime to a year in the past. i.e. 2010' }
              ]
            },
          { number: '2', process: 'Place Sitefinity in Maintenance mode', done: 'false', time_completed: '', sub_steps: [] },
          { number: '3', process: 'Pre Solution Depolyment - Remove CRM HTTPS Binding', done: 'false', time_completed: '', sub_steps: [] },
          { number: '4', process: 'Production CRM Deployment', done: 'false', time_completed: '', sub_steps: [] },
          { number: '5', process: 'Production Intranet Deployment', done: 'false', time_completed: '' , sub_steps: [] },
          { number: '6', process: 'Production DMZ Deployment', done: 'false', time_completed: '', sub_steps: [] },
          { number: '7', process: 'CRM Manual Steps', done: 'false', time_completed: '', sub_steps: [] },
          { number: '8', process: 'Post Release Confirmation', done: 'false', time_completed: '', sub_steps: [] },
          { number: '9', process: 'Communicate to team members that release is complete', done: 'false', time_completed: '', sub_steps: [] }
      ];
      res.send(200, req.body);
  })

  // return all steps
  .get(function(req, res) {
      //res.send({message: "TODO get all steps in the database"});
      steps = [
          {
            number: '1', process: 'Take database backups', done: 'true', time_completed: '',
            sub_steps: [
              { number: '1', process: 'Log onto the Terminal Services Jump Host as a user with local administrator privileges' },
              { number: '2', process: 'Edit the web.config located in D:\inetpub\wwwroot\sitefinity' },
              { number: '3', process: 'Change the following setting from X to Y' },
              { number: '4', process: 'Update fiig.config by setting the maintenance datetime to a year in the past. i.e. 2010' }
              ]
            },
          { number: '2', process: 'Place Sitefinity in Maintenance mode', done: 'false', time_completed: '', sub_steps: [] },
          { number: '3', process: 'Pre Solution Depolyment - Remove CRM HTTPS Binding', done: 'false', time_completed: '', sub_steps: [] },
          { number: '4', process: 'Production CRM Deployment', done: 'false', time_completed: '', sub_steps: [] },
          { number: '5', process: 'Production Intranet Deployment', done: 'false', time_completed: '' , sub_steps: [] },
          { number: '6', process: 'Production DMZ Deployment', done: 'false', time_completed: '', sub_steps: [] },
          { number: '7', process: 'CRM Manual Steps', done: 'false', time_completed: '', sub_steps: [] },
          { number: '8', process: 'Post Release Confirmation', done: 'false', time_completed: '', sub_steps: [] },
          { number: '9', process: 'Communicate to team members that release is complete', done: 'false', time_completed: '', sub_steps: [] }
      ];
      res.send(200, steps);
  })

// api for an individual step
router.route('/steps/:id')

  // update a step
  .put(function(req, res) {
      console.log('update step');
      return res.send({message: "TODO modify an existing step by using param " + req.param.id })
  })

  // get specific step
  .get(function(req, res) {
      console.log('get a step');
      return res.send({message: "TODO get an existing step by using param " + req.param.id })
  })

  // delete a step
  .delete(function(req, res) {
      console.log('delete a step');
      return res.send({message: "TODO delete an existing step by using param " + req.param.id })
  });

module.exports = router;
