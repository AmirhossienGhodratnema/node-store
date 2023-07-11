const { GraphQLList, GraphQLString } = require("graphql");
const { Category } = require("../../models/categorys");
const { CategoryTypes, CategoryChildTypes } = require("../typeDefs/catgoryType");


const CategoryResolver = {
    type: new GraphQLList(CategoryTypes),
    resolve: async (_, args) => {
        return await Category.find({}).populate('parent')
    }
};


const CategoryChildResolver = {
    type: new GraphQLList(CategoryChildTypes),
    args: {
        parent: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { parent } = args;
        console.log(args)
        return await Category.find({parent});
    }
};

module.exports = { CategoryResolver, CategoryChildResolver };

