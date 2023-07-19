const { GraphQLList } = require("graphql");
const { ProductType } = require("../typeDefs/productType");
const { Product } = require("../../models/product");


const ProductResolver = {
    type: new GraphQLList(ProductType),
    resolve: async () => {
        return await Product.find({}).populate([
            { path: 'supplier' },
            { path: 'category' },
            {
                path: 'CommentBlog',
                populate: [
                    { path: 'user', select: [{ _id: 1, firstName: 1, lastName: 1 }]},
                    { path: 'parent.user', select: [{ _id: 1, firstName: 1, lastName: 1 }], },
                ]
            }
        ]);
    }
};

module.exports = { ProductResolver };

