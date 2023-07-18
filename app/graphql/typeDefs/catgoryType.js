const { GraphQLObjectType, GraphQLString, GraphQLList, graphql } = require("graphql");
const { CategoryType, AnyType } = require("./public.type");



const CategoryTypes = new GraphQLObjectType({
    name: 'CategoryTypes',
    fields: {
        title: { type: GraphQLString },
        children: { type: new GraphQLList(AnyType) }
    }
});


const CategoryChildTypes = new GraphQLObjectType({
    name: 'CategoryChildTypes',
    fields: {
        title: { type: GraphQLString },
    }
});


module.exports = { CategoryTypes, CategoryChildTypes };