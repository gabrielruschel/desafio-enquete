process.env.NODE_ENV = 'test';

const chai = require('chai');

const chaiHttp = require('chai-http');

const assert = chai.assert;

const expect = chai.expect;

const should = chai.should();

const server = require('../server');

chai.use(chaiHttp);

describe('API is running', () => {
    it('Should respond its running', (done) => {
        chai.request(server)
            .get('/')
            .end((err,res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('message');
                done();
            })
    });
});
