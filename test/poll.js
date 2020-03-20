process.env.NODE_ENV = 'test';

const chai = require('chai');

const chaiHttp = require('chai-http');

const assert = chai.assert;

const expect = chai.expect;

const should = chai.should();

const server = require('../server');

let mongoose = require("mongoose");

let Poll = require('../app/models/poll');

chai.use(chaiHttp);

console.log(process.env.NODE_ENV);
console.log(mongoose.connection.name);

describe('Polls', () => {
    beforeEach((done) => { // Empty the database before each test
        Poll.remove({}, (err) => {
           done();
        });
    });

    describe('GET /poll', () => {
        it('Should get all the books', (done) => {
            chai.request(server)
                .get('/poll')
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('POST /poll', () => {
        it('Should not create a Poll without options', (done) => {
            let poll = {
                poll_description: "Description test"
            }
            chai.request(server)
                .post('/poll')
                .send(poll)
                .end((err,res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql("Poll options can not be empty");
                    done();
                });
        });

        it('Should create a Poll', (done) => {
            let poll = {
                poll_description: "Description test",
                options: [
                    "Option One",
                    "Option Two"
                ]
            }
            chai.request(server)
                .post('/poll')
                .send(poll)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('poll_id');
                    done();
                });
        });
    });

    describe('GET /poll/:pollId', () => {
        it('Should get a poll by the given id', (done) => {
            let poll = new Poll({
                poll_description: "Description test",
                options: [
                    {option_id:1, option_description: "Option One"},
                    {option_id:2, option_description: "Option Two"}
                ]
            });
            poll.save((err, poll) => {
                chai.request(server)
                .get('/poll/' + poll.poll_id)
                .send(poll)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('poll_id');
                    res.body.should.have.property('poll_description');
                    res.body.should.have.property('options');
                    res.body.poll_id.should.be.eql(poll.poll_id);
                    done();
                });
            });
        });
    });

    describe('POST /poll/:pollId/vote', () => {
        it('Should vote for an option of the poll', (done) => {
            let poll = new Poll({
                poll_description: "Description test",
                options: [
                    {option_id:1, option_description: "Option One"},
                    {option_id:2, option_description: "Option Two"}
                ]
            });
            poll.save((err,poll) => {
                chai.request(server)
                .post('/poll/' + poll.poll_id + '/vote')
                .send({option_id: 1})
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('options');
                    res.body.options[0].should.have.property('qty');
                    res.body.options[0].qty.should.be.eql(1);
                    done();
                });
            });
        });
    });

    describe('GET /poll/:pollId/stats', () => {
        it('Should show stats for the poll of the given id', (done) => {
            let poll = new Poll({
                poll_description: "Description test",
                options: [
                    {option_id:1, option_description: "Option One"},
                    {option_id:2, option_description: "Option Two"}
                ]
            });
            poll.save((err, poll) => {
                chai.request(server)
                .get('/poll/' + poll.poll_id + '/stats')
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('views');
                    res.body.should.have.property('votes');
                    done();
                });
            });
        });
    });
});
