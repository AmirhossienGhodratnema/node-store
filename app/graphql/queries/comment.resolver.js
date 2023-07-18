const { GraphQLList, GraphQLString, GraphQLBoolean } = require("graphql");
const { verifyTokenGraphQl } = require("../../middleware/verifytoken");
const { createError, checkMongoId, checkMongoIdGraphQl, createErrorGraphQl } = require("../../../functions/golobal");
const { StatusCodes } = require("http-status-codes");
const { CommentType } = require("../typeDefs/commentType");
const { Comment } = require("../../models/comment");
const { Blog } = require("../../models/blog");
const { ResponseType } = require("../typeDefs/public.type");
const mongoose = require('mongoose');

const CommentForBlogResolver = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },    // String type
        blogID: { type: GraphQLString },    // String type
        parent: { type: GraphQLString },    // String type
    },
    resolve: async (_, args, context) => {
        const { req, res } = context;    // Get req and res from context.
        const user = await verifyTokenGraphQl(req, res);    // Check user for authauthentication.
        const { comment, blogID, parent } = args;    // Get data from client.

        return {    // Response
            status: StatusCodes.CREATED,
            data: {
                message: 'Comment registration was done successfully',
            }
        }
    }
};

async function checkExistBlog(id) {
    await checkMongoIdGraphQl(id);    // Check mongoID.
    const blog = await Blog.findOne({ _id: id });    // Find blog.
    if (!blog) throw new Error('Blog is not defined');    // Create Error for not defined blog.
    return blog;
}

async function getOneField(model, parent) {
    await checkMongoIdGraphQl(parent);    // Check mongoID.
    const result = await model.findOne({ parent });
    // if (comment) throw new Error('Comment is not defined');
    return result
}

module.exports = { CommentForBlogResolver };

