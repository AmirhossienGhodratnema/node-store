const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");





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
        category: { type: new GraphQLList(GraphQLString) },
        price: { type: GraphQLString },
        supplier: { type: GraphQLString },
        title: { type: GraphQLString },
        features: { type: new GraphQLList(Features) },
    }
});


module.exports = { ProductType };