const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get((req, res) => {
    Event.find({}, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    const newEvent = new Event({name, description, startTime, endTime});

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
