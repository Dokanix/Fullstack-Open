const { describe, expect } = require('@jest/globals');
const favoriteBlog = require('../utils/list_helper').favoriteBlog;

describe('favorite blog', () => {
  const blogs = [
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
    {
      title: 'Kolorowe Grafy',
      author: 'Marek Kubale',
      likes: 15,
    },
    {
      title: 'Wszystko o Grafach',
      author: 'Robert Ostrowski',
      likes: 10,
    },
  ];

  test('of empty list be correct', () => {
    expect(favoriteBlog([])).toEqual(null);
  });

  test('of 1 blog returns the blog', () => {
    expect(favoriteBlog([blogs[0]])).toEqual(blogs[0]);
  });

  test('of a list be correct', () => {
    expect(favoriteBlog(blogs)).toEqual(blogs[1]);
  });
});
