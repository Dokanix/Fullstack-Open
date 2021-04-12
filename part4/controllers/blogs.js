const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const notes = await Blog.find({}).populate('author', {
    name: 1,
    username: 1,
  });

  response.json(notes);
});

blogsRouter.post('/', async (request, response) => {
  try {
    const { body } = request;

    const user = await User.findById(request.user.id);

    const blog = new Blog({
      title: body.title,
      url: body.url,
      likes: body.likes,
      author: user._id,
    });

    const savedBlog = await blog.save();
    user.notes = user.notes.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.user.id);

    const { id } = request.params;

    const blog = await Blog.findById(id);

    if (blog.author.toString() == user._id.toString()) {
      await Blog.findByIdAndRemove(id);
      response.status(204).end();
    }
  } catch (error) {
    response.status(400).json({ error: 'invalid token' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body;
  const { id } = request.params;

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
