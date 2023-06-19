
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { ProductResolver } = require('./queries/product.Resolver');
const { BlogResolver } = require('./queries/blog.resolver');
const { CategoryResolver } = require('./queries/category.resolver');

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        blog: BlogResolver,
        product: ProductResolver,
        category: CategoryResolver,
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