const { GraphQLList } = require("graphql");
const { ProductType } = require("../typeDefs/productType");
const { Product } = require("../../models/product");
const { verifyTokenGraphQl } = require("../../middleware/verifytoken");
const { Blog } = require("../../models/blog");
const { BlogType } = require("../typeDefs/blogType");


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
    }
};

const getUserBookmarkBlog = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        const { req, res } = context;
        const user = await verifyTokenGraphQl(req, res);
        const product = await Blog.find({ bookMarks: user._id }).populate([
            { path: 'author' },
            { path: 'category' },
            {
                path: 'CommentBlog',
                populate: [
                    { path: 'user', select: [{ _id: 1, firstName: 1, lastName: 1 }], },
                    { path: 'parent.user', select: [{ _id: 1, firstName: 1, lastName: 1 }], },
                ]
            }]);
        return product;
    }
};
module.exports = {
    getUserBookmarkProduct,
    getUserBookmarkBlog
};

