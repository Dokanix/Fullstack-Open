const { expect } = require('@jest/globals');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

test('disallows too short password', async () => {
  const users = await User.find({});

  const newUser = new User({
    username: 'Dokan',
    name: 'Dominik Klon',
    password: 'Ok',
  });

  await api.post('/api/users').send(newUser).expect(400);

  const newUsers = await User.find({});

  expect(users).toHaveLength(newUsers.length);
});
