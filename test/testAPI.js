const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index')
var expect = chai.expect;

chai.should();
chai.use(chaiHttp);

describe("Test API", () => {
    it("It should get user detail", (done) => {
        var userId = "abhayd"
        chai.request(server)
        .get(`/user/${userId}`)
        .end((err, res) => {
            res.should.have.status(200);
        })
        done();
    })

    it("It should not get user detail", (done) => {
        var userId = "johnpapalknkjb"
        chai.request(server)
        .get(`/user/${userId}`)
        .end((err, res) => {
            res.should.have.status(404);
        })
        done();
    })
})