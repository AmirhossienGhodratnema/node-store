const { GraphQLList } = require("graphql");
const { BlogType } = require("../typeDefs/blogType");
const { Blog } = require("../../models/blog");
const { verifyTokenGraphQl } = require("../../middleware/verifytoken");
const { createError } = require("../../../functions/golobal");
const { StatusCodes } = require("http-status-codes");


const BlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await verifyTokenGraphQl(req, res);
        if (!user) await createError(StatusCodes.NOT_FOUND, 'User is not found');
        const blog = await Blog.find({}).populate([{ path: 'author' }, { path: 'category' }]);
        console.log('blog', blog)
        return blog;
    }
};

module.exports = { BlogResolver };

