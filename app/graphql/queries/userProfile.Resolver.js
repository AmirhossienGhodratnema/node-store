const { GraphQLList } = require("graphql");
const { ProductType } = require("../typeDefs/productType");
const { Product } = require("../../models/product");
const { verifyTokenGraphQl } = require("../../middleware/verifytoken");


const getUserBookmarkProduct = {
    type: new GraphQLList(ProductType),
    resolve: async (_, args, context) => {
        const { req, res } = context;
        const user = await verifyTokenGraphQl(req, res);
        const product = await Product.find({ bookMarks: user._id }).populate([
            { path: 'supplier' },
            { path: 'category' },
            {
                path: 'CommentBlog',
                populate: [
                    { path: 'user', select: [{ _id: 1, firstName: 1, lastName: 1 }]},
                    { path: 'parent.user', select: [{ _id: 1, firstName: 1, lastName: 1 }], },
                ]
            }
        ]);;
        return product;

        // return await Product.find({}).populate([
        //     { path: 'supplier' },
        //     { path: 'category' },
        //     {
        //         path: 'CommentBlog',
        //         populate: [
        //             { path: 'user', select: [{ _id: 1, firstName: 1, lastName: 1 }]},
        //             { path: 'parent.user', select: [{ _id: 1, firstName: 1, lastName: 1 }], },
        //         ]
        //     }
        // ]);
    }
};

module.exports = {
    getUserBookmarkProduct
};

