var express = require('express');
var router = express.Router();

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
