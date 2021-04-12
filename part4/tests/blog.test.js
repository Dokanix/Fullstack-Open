const { afterAll, beforeEach, expect } = require('@jest/globals');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('server returns 2 blogs', async () => {
  const blogs = await Blog.find({});
  expect(blogs).toHaveLength(3);
});

test('blogs have an id property', async () => {
  let blogs = await Blog.find({});
  blogs = blogs.map((blog) => blog.toJSON());
  expect(blogs[0].id).toBeDefined();
});

test('POST creates a new blog', async () => {
  const initialBlogs = await Blog.find({});
  const initialLength = initialBlogs.length;

  const newBlog = {
    title: 'O krolewstwie polskim',
    author: 'Kazimierz Wielki',
    url: 'test.com',
    likes: 69,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const endBlogs = await Blog.find({});
  expect(endBlogs).toHaveLength(initialLength + 1);
});

test('Likes defaults to 0', async () => {
  const newBlog = {
    title: 'Technologia XD',
    author: 'Techno Swir',
    url: 'test.com',
  };

  const blogObject = new Blog(newBlog);
  const parsedBlog = await JSON.parse(JSON.stringify(blogObject));
  expect(parsedBlog.likes).toBe(1);
});

test('Disallows creation of empty blogs', async () => {
  const initialBlogs = await Blog.find({});
  const initialLength = initialBlogs.length;

  const newBlog = {
    author: 'Artur Boruc',
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const endBlogs = await Blog.find({});

  expect(endBlogs).toHaveLength(initialLength);
});

test('Deletes a blog', async () => {
  const blogs = await Blog.find({});
  const deletedBlog = blogs[0];

  await api.delete(`/api/blogs/${deletedBlog.id}`).expect(204);

  const newBlogs = await Blog.find({});

  expect(newBlogs).toHaveLength(blogs.length - 1);

  const contents = newBlogs.map((r) => r.title);
  expect(contents).not.toContain(deletedBlog.title);
});

test('Updated a blog', async () => {
  const blogs = await Blog.find({});
  let oldBlog = blogs[0].toJSON();
  const blogToUpdate = { ...oldBlog, likes: 0 };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200);

  const newBlogs = await Blog.find({});
  const updatedBlog = newBlogs[0].toJSON();

  expect(updatedBlog).toEqual(blogToUpdate);
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
