const { GraphQLObjectType, GraphQLString } = require("graphql");



const AuthorType = new GraphQLObjectType({
    name: 'AuthorType',
    fields: {
        _id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
    }
});

const CategoryType = new GraphQLObjectType({
    name: 'CategoryType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
    }
});


module.exports = {
    AuthorType,
    CategoryType
};