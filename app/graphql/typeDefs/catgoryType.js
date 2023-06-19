const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");



const CategoryTypes = new GraphQLObjectType({
    name: 'CategoryTypes',
    fields: {
        title: { type: GraphQLString },
    }
});


module.exports = { CategoryTypes };