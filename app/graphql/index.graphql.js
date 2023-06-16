
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { BlogResolver } = require('./queries/blog.resolver');

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        blog: BlogResolver
    }
});


const rootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {}
});


const grSQL = new GraphQLSchema({
    query: rootQuery,
    // mutation: rootMutation
});

module.exports = { grSQL };