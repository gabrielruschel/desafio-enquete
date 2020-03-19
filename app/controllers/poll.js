const Poll = require('../models/polls.js');

exports.create = (req,res) => {
    // Validate request
    // if(!req.body.poll_description) {
    //     return res.status(400).send({
    //         message: "Poll content can not be empty"
    //     });
    // }
    console.log("req.body:");
    console.log(req.body);

    const poll = new Poll({
        poll_description: req.body.poll_description
    });

    req.body.options.forEach((item, i) => {
        poll.options.push({"option_id":i+1, "option_description": item});
    });

    console.log("poll object");
    console.log(poll);

    // Save Note in the database
    poll.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Poll."
        });
    });
};

exports.findAll = (req,res) => {
    Poll.find()
    .then(polls => {
        res.send(polls);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findPoll = (req,res) => {
    console.log("Req param pollId " + req.params.pollId);
    Poll.findOne({poll_id: req.params.pollId},{'_id': 0, '__v':0, 'options._id':0, 'options.qty': 0})
    .then(poll => {
        if (!poll) {
            return res.status(404).send({
                message: "Poll not found with id " + req.params.pollId
            });
        }
        res.send(poll)
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error retrieving poll with id " + req.params.pollId
        });
    });
};
