const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt } = require("graphql");
const { AuthorType, CategoryType, AnyType } = require("./public.type");

const ParentType = new GraphQLObjectType({
    name: 'parentType',
    fields: {
        user: { type: AuthorType },
        comment: { type: GraphQLString },
        show: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
        openToComment: { type: GraphQLBoolean },
        parent: { type: new GraphQLList(GraphQLString) },
        category: { type: new GraphQLList(CategoryType) },
    }
});

const CommentType = new GraphQLObjectType({
    name: 'commentType',
    fields: {
        _id: { type: GraphQLString },
        user: { type: AuthorType },
        comment: { type: GraphQLString },
        show: { type: GraphQLBoolean },
        openToComment: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
        parent: { type: new GraphQLList(ParentType) },
    }
});



module.exports = { CommentType };