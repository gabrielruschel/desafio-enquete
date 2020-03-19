module.exports = (app) => {

    // Get controller functions
    const pollController = require('../controllers/poll.js');

    // define a simple route
    app.get('/', (req, res) => {
        res.json({"message": "Desafio Enquete API"});
    });

    app.get('/poll', pollController.findAll);

    app.post('/poll', pollController.createPoll);

    app.get('/poll/:pollId', pollController.findPoll);

    app.post('/poll/:pollId/vote', pollController.votePoll);

    app.get('/poll/:pollId/stats', pollController.pollStats);
}
