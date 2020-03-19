const Poll = require('../models/poll.js');

exports.createPoll = (req,res) => {
    // Validate request
    // if(!req.body.poll_description) {
    //     return res.status(400).send({
    //         message: "Poll content can not be empty"
    //     });
    // }

    const poll = new Poll({
        poll_description: req.body.poll_description
    });

    req.body.options.forEach((item, i) => {
        poll.options.push({"option_id":i+1, "option_description": item});
    });

    // Save Note in the database
    poll.save()
    .then(data => {
        res.send({poll_id:data.poll_id});
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
    Poll.findOne({poll_id: req.params.pollId},{'__v':0, 'options._id':0, 'options.qty': 0})
    .then(poll => {
        if (!poll) {
            return res.status(404).send({
                message: "Poll not found with id " + req.params.pollId
            });
        }
        poll.views = poll.views + 1;
        poll.save();
        let result = {
            poll_id: poll.poll_id,
            poll_description: poll.poll_description,
            options: poll.options,
        }
        res.send(result)
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error retrieving poll with id " + req.params.pollId
        });
    });
};

exports.votePoll = (req,res) => {
    Poll.findOne({poll_id: req.params.pollId},)
    .then(poll => {
        if (!poll) {
            return res.status(404).send({
                message: "Not found"
            });
        }
        console.log(poll);
        let opt = poll.options.find(opt => opt.option_id === req.body.option_id);
        opt.qty = opt.qty + 1;
        poll.save();
        res.send(poll);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error processing vote"
        });
    });
};

exports.pollStats = (req,res) => {
    Poll.findOne({poll_id: req.params.pollId},{'_id': 0, '__v':0, 'options._id':0, 'options.option_description':0})
    .then(poll => {
        if (!poll) {
            return res.status(404).send({
                message: "Poll not found"
            });
        }
        let result = {
            views: poll.views,
            votes: poll.options
        }
        res.send(result);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Error retrieving poll stats with id " + req.params.pollId
        });
    });
};
