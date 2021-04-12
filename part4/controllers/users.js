const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  try {
    const { body } = request;

    if (body.password.length < 4) {
      return response.json({ error: 'password too short' });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = new User({
      username: body.username,
      name: body.name,
      hashedPassword,
    });

    const savedUser = await newUser.save();

    response.json(savedUser);
  } catch (error) {
    response.status(400).json({ error: 'something went wrong' });
  }
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;
