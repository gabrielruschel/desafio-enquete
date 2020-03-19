module.exports = (app) => {
    const pollController = require('../controllers/poll.js');

    // define a simple route
    app.get('/', (req, res) => {
        res.json({"message": "Desafio Enquete API"});
    });

    // app.get('/polls', pollController.findAll);

    app.post('/polls', pollController.create);

    app.get('/polls/:pollId', pollController.findPoll);
}
