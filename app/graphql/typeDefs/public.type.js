const { GraphQLObjectType, GraphQLString, GraphQLScalarType, Kind } = require("graphql");
const { toObject, parseLiteral } = require("../utils/utils");

const AnyType = new GraphQLScalarType({
    name: "anyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral,
})




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



const ResponseType = new GraphQLObjectType({
    name: "responseType",
    fields : {
        status: { type: GraphQLString },
        data: { type: AnyType },
    }
})



module.exports = {
    AuthorType,
    CategoryType,
    AnyType,
    ResponseType,
};