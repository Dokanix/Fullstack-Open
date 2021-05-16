const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const jwt = require('jsonwebtoken');

const MONGODB_URI =
  'mongodb+srv://Fullstack:Fullstack@fullstack-open.xxplo.mongodb.net/library?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    getAuthor(name: String!): Author!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Author: {
    bookCount: (root) => Author.collection.countDocuments(),
  },
  Query: {
    getAuthor: (root, args) => Author.findOne({ name: args.name }),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args) {
        return Book.find({});
      }

      if (args.author) {
        return Book.find({ author: args.author });
      }

      //TODO Change
      return Book.find({});
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        console.log(author);
        await author.save();
      }

      return book.save();
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;

      return author.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
