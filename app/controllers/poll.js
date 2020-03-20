const Poll = require('../models/poll.js');

exports.createPoll = (req,res) => {
    // Validate request entry
    if(!req.body.poll_description) {
        return res.status(400).send({
            message: "Poll description can not be empty"
        });
    } else if (!req.body.options || req.body.options.length == 0) {
        return res.status(400).send({
            message: "Poll options can not be empty"
        });
    }

    const poll = new Poll({
        poll_description: req.body.poll_description
    });

    req.body.options.forEach((item, i) => {
        poll.options.push({"option_id":i+1, "option_description": item});
    });

    // Save Poll in the database
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
            message: err.message || "Some error occurred while getting the polls."
        });
    });
};

exports.findPoll = (req,res) => {
    // Get the Poll with matching poll_id
    Poll.findOne({poll_id: req.params.pollId},{'__v':0, 'options._id':0, 'options.qty': 0})
    .then(poll => {
        if (!poll) {
            return res.status(404).send({
                message: "Poll not found with id " + req.params.pollId
            });
        }
        // Increment the views counter
        poll.views = poll.views + 1;
        poll.save();

        // Format the response
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
    // Validate entry
    if (!req.body.option_id) {
        return res.status(400).send({
            message: "Option ID can not be empty"
        });
    }

    // Get the Poll with matching poll_id
    Poll.findOne({poll_id: req.params.pollId},)
    .then(poll => {
        if (!poll) {
            return res.status(404).send({
                message: "Not found"
            });
        }

        // Get the option of the poll with matching id
        let opt = poll.options.find(opt => opt.option_id === req.body.option_id);

        // Update the number of votes
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
    // Get the Poll with matching poll_id
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
