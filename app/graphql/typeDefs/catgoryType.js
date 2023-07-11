const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { CategoryType } = require("./public.type");



const CategoryTypes = new GraphQLObjectType({
    name: 'CategoryTypes',
    fields: {
        title: { type: GraphQLString },
        parent: {type: new GraphQLList(CategoryType)}
    }
});


const CategoryChildTypes = new GraphQLObjectType({
    name: 'CategoryChildTypes',
    fields: {
        title: { type: GraphQLString },
    }
});


module.exports = { CategoryTypes, CategoryChildTypes };