const sinon = require('sinon');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { loginHandler } = require('../routes/auth');

let expect;

before(async () => {
  const chai = await import('chai');
  expect = chai.expect;
});
describe('Auth Module', () => {
  it('should hash the password correctly on register', async () => {
    const password = 'test123';
    const hashedPass = await bcrypt.hash(password, 10);
    expect(hashedPass).to.be.a('string');
  });

  it('should return error if user is not found during login', async () => {
    sinon.stub(User, 'findOne').returns(null); // Mock Method User Model
    const req = { body: { username: 'test', password: 'test123' } }; // Mok request
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }; // Mock answer

    await loginHandler(req, res); // Call loginHandler directly
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith('Wrong credentials!')).to.be.true;

    User.findOne.restore(); // Restoring the original method
  });
});
