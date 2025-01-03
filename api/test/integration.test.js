const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const { expect } = require('chai'); 

before(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

after(async () => {
  await mongoose.connection.close();
});

describe('Integration Tests', () => {
  it('should register a user successfully', async function () {
    this.timeout(5000); 
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'test', email: 'test@mail.com', password: 'test123' });

    console.log('Response status:', res.status);
    console.log('Response body:', res.body);
  
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('_id');
  });

  it('should fail login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'wrong', password: 'wrong' });

    expect(res.status).to.equal(400);
    expect(res.body).to.equal('Wrong credentials!');
  });
});
