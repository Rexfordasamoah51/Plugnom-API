const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "http://localhost:5050/";
let should = chai.should();

chai.use(chaiHttp);
var token;

describe("User Endpoint test", () => {
  it("should return 400 when phone number exist", (done) => {
    chai
      .request(baseUrl)
      .post("api/v1/users")
      .send({
        full_name: "Poddin Api",
        username: "rexcode1",
        account_type: "Personal",
        phone: "+233571148894",
        pin: "000000",
        gender: "Male",
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("should return token when valid cred us passed", (done) => {
    chai
      .request(baseUrl)
      .post("api/v1/login")
      .send({
        phone: "+2348072159342",
        pin: "000000",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("accessToken");
        token = res.body.accessToken;
        done();
      });
  });

  it("should return all users when invalid token is passed", (done) => {
    chai
      .request(baseUrl)
      .get("api/v1/users")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
