// graphql is so awesome
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = graphql;

//models
const Book = require('../model/Book');
const Author = require('../model/Author');

const BookType = new GraphQLObjectType({
  //the name is like the schema name in mongoose schema
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      //the power of the parent argument
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  //the name is like the schema name in mongoose schema
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

//Root Queries
//queries are the ways we initially jump into the graph to grab data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //   query for a book
    book: {
      //the type of the data we expect to get
      type: BookType,
      //the arguement passed to the query
      args: { id: { type: GraphQLID } },
      //we use parent for relations
      resolve(parent, args) {
        return Book.findById(args.id);
      },
    },

    //   query for an author
    author: {
      //the type of the data we expect to get
      type: AuthorType,
      //the arguement passed to the query
      args: { id: { type: GraphQLID } },
      //we use parent for relations
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },

    // query for all books
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      },
    },

    // query for all authors
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      //the arguement passed to the query
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      //this is where the magic happens
      //we usually past data in the request body
      //here we pass them as arguments
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });

        return author.save();
      },
    },

    addBook: {
      type: BookType,
      args: {
        //new GraphQLNonNull(GraphQLString) makes sure they pass in the field
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });

        return book.save();
      },
    },
  },
});

//we always need to define to define a root query and a mutation
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
