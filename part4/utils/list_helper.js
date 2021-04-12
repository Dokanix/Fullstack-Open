const totalLikes = (blogs) => {
  return blogs.reduce((prev, curr) => prev + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return null;
  }

  return blogs.reduce((prev, curr) => (curr.likes > prev.likes ? curr : prev));
};

const mostBlogs = (blogs) => {
  const authors = {};

  for (const blog of blogs) {
    if (blog.author in authors) {
      authors[blog.author]++;
    } else {
      authors[blog.author] = 1;
    }
  }

  const mostPopular = Object.keys(authors).reduce((prev, curr) =>
    authors[prev] > authors[curr] ? prev : curr
  );

  return { author: mostPopular, blogs: authors[mostPopular] };
};

const mostLikes = (blogs) => {
  const authors = {};

  for (const blog of blogs) {
    if (blog.author in authors) {
      authors[blog.author] += blog.likes;
    } else {
      authors[blog.author] = blog.likes;
    }
  }

  const mostPopular = Object.keys(authors).reduce((prev, curr) =>
    authors[prev] > authors[curr] ? prev : curr
  );

  return { author: mostPopular, likes: authors[mostPopular] };
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
