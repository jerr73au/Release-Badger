var express = require('express');
var router = express.Router();
var steps = [
    {
      number: '1', process: 'Take database backups', done: false, time_completed: '',
      sub_steps: [
        { number: '1', process: 'Log onto the Terminal Services Jump Host as a user with local administrator privileges' },
        { number: '2', process: 'Edit the web.config located in D:\inetpub\wwwroot\sitefinity' },
        { number: '3', process: 'Change the following setting from X to Y' },
        { number: '4', process: 'Update fiig.config by setting the maintenance datetime to a year in the past. i.e. 2010' }
        ]
      },
    { number: '2', process: 'Place Sitefinity in Maintenance mode', done: false, time_completed: '', sub_steps: [] },
    { number: '3', process: 'Pre Solution Depolyment - Remove CRM HTTPS Binding', done: false, time_completed: '', sub_steps: [] },
    { number: '4', process: 'Production CRM Deployment', done: false, time_completed: '', sub_steps: [] },
    { number: '5', process: 'Production Intranet Deployment', done: false, time_completed: '' , sub_steps: [] },
    { number: '6', process: 'Production DMZ Deployment', done: false, time_completed: '', sub_steps: [] },
    { number: '7', process: 'CRM Manual Steps', done: false, time_completed: '', sub_steps: [] },
    { number: '8', process: 'Post Release Confirmation', done: false, time_completed: '', sub_steps: [] },
    { number: '9', process: 'Communicate to team members that release is complete', done: false, time_completed: '', sub_steps: [] }
];

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
      res.send(200, steps);
  })

  // return all steps
  .get(function(req, res) {
      //res.send({message: "TODO get all steps in the database"});
      console.log('getting steps');
      console.log(steps);
      res.send(200, steps);
  })

// api for an individual step
router.route('/steps/:id')

  // update a step
  .put(function(req, res) {
      var id = req.params.id.replace(':', '')
      console.log('update step ' + id);
      var step = getStep(id);
      if(step){
          step.done = true;
          return res.send(200, step);
      }

      return res.send({message: "could not find a steps with number " + id })
  })

  // get specific step
  .get(function(req, res) {
      var id = req.params.id.replace(':', '')
      console.log('getting step ' + req.params.id);
      var step = getStep(id);
      if(!step){
          return res.send(200, step);
      }
      return res.send({message: "could not find a steps with number " + req.params.id })
  })

  // delete a step
  .delete(function(req, res) {
      console.log('delete a step');
      return res.send({message: "TODO delete an existing step by using param " + req.params.id })
  });

function getStep(id) {
    console.log('searching for step');
    for(var i=0; i<steps.length; i++) {
        if(steps[i].number == id) {
            console.log('step found ' + id);
            return steps[i];
        }
    }
    console.log('step not found ' + id);
    return null;
}

module.exports = router;
