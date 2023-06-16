const { GraphQLList } = require("graphql");
const { ProductType } = require("../typeDefs/productType");
const { Product } = require("../../models/product");


const ProductResolver = {
    type: new GraphQLList(ProductType),
    resolve: async () => {
        return await Product.find({}).populate([{ path: 'supplier' }, { path: 'category' }]);
    }
};

module.exports = { ProductResolver };

