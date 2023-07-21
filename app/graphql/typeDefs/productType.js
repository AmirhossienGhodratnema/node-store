const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInputObjectType } = require("graphql");
const { CategoryType, AuthorType } = require("./public.type");
const { CommentType } = require("./commentType");





const Features = new GraphQLObjectType({
    name: 'Features',
    fields: {
        lengths: { type: GraphQLString },
        height: { type: GraphQLString },
        width: { type: GraphQLString },
        weight: { type: GraphQLString },
        coler: { type: new GraphQLList(GraphQLString) },
        model: { type: new GraphQLList(GraphQLString) },
        title: { type: GraphQLString },
        madein: { type: GraphQLString },
    }
});



const ProductType = new GraphQLObjectType({
    name: 'ProductType',
    fields: {
        title: { type: GraphQLString },
        shortText: { type: GraphQLString },
        shortDescription: { type: GraphQLString },
        description: { type: GraphQLString },
        images: { type: new GraphQLList(GraphQLString) },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: new GraphQLList(CategoryType) },
        price: { type: GraphQLString },
        supplier: { type: AuthorType },
        features: { type: Features },
        imageUrl: { type: new GraphQLList(GraphQLString) },
        CommentBlog: { type: new GraphQLList(CommentType) },
    }
});


module.exports = { ProductType };