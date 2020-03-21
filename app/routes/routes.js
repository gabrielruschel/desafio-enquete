module.exports = (app) => {

    // Get controller functions
    const pollController = require('../controllers/poll.js');

    // Define a simple route
    app.get('/', (req, res) => {
        res.json({"message": "Enquete API"});
    });

    app.get('/poll', pollController.findAll);

    // Create a poll
    app.post('/poll', pollController.createPoll);

    // Retrieve a poll from id
    app.get('/poll/:pollId', pollController.findPoll);

    // Vote for a poll
    app.post('/poll/:pollId/vote', pollController.votePoll);

    // Get stats for a poll
    app.get('/poll/:pollId/stats', pollController.pollStats);
}
