const { GraphQLList } = require("graphql");
const { Category } = require("../../models/categorys");
const { CategoryTypes } = require("../typeDefs/catgoryType");


const CategoryResolver = {
    type: new GraphQLList(CategoryTypes),
    resolve: async () => {
        return await Category.find({})
    }
};

module.exports = { CategoryResolver };

