const { GraphQLList, GraphQLString, GraphQLBoolean } = require("graphql");
const { verifyTokenGraphQl } = require("../../middleware/verifytoken");
const { createError, checkMongoId, checkMongoIdGraphQl, createErrorGraphQl } = require("../../../functions/golobal");
const { StatusCodes } = require("http-status-codes");
const { CommentType } = require("../typeDefs/commentType");
const { Blog } = require("../../models/blog");
const { ResponseType } = require("../typeDefs/public.type");
const mongoose = require('mongoose');
const { copyObject } = require("../../utils/auth");
const { Comment } = require("../../models/comment");
const { Course } = require("../../models/course");
const { Product } = require("../../models/product");

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
        const blog = await checkExistBlog(blogID);

        if (parent) {
            await getComment(Comment, parent);
            await Comment.updateOne({ _id: parent }, {
                $push: {
                    parent: {
                        user: user._id,
                        comment,
                        show: false,
                        openToComment: false
                    }
                }
            })
            return {    // Response
                status: StatusCodes.CREATED,
                data: {
                    message: 'Comment registration was done successfully: Parent',
                }
            }
        } else {
            await Comment.create({
                comment,
                user: user._id,
                blogID,
                show: false,
                openToComment: !parent,
            })
            return {    // Response
                status: StatusCodes.CREATED,
                data: {
                    message: 'Comment registration was done successfully: Main',
                }
            }

        }
    }
};

const CommentForCourseResolver = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },    // String type
        courseID: { type: GraphQLString },    // String type
        parent: { type: GraphQLString },    // String type
    },
    resolve: async (_, args, context) => {
        const { req, res } = context;    // Get req and res from context.
        const user = await verifyTokenGraphQl(req, res);    // Check user for authauthentication.
        const { comment, courseID, parent } = args;    // Get data from client.
        const blog = await checkExistCourse(courseID);

        if (parent) {
            await getComment(Comment, parent);
            await Comment.updateOne({ _id: parent }, {
                $push: {
                    parent: {
                        user: user._id,
                        comment,
                        show: false,
                        openToComment: false
                    }
                }
            })
            return {    // Response
                status: StatusCodes.CREATED,
                data: {
                    message: 'Comment registration was done successfully: Parent',
                }
            }
        } else {
            await Comment.create({
                comment,
                user: user._id,
                courseID,
                show: false,
                openToComment: !parent,
            })
            return {    // Response
                status: StatusCodes.CREATED,
                data: {
                    message: 'Comment registration was done successfully: Main',
                }
            }

        }
    }
};

const CommentForProductResolver = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },    // String type
        productID: { type: GraphQLString },    // String type
        parent: { type: GraphQLString },    // String type
    },
    resolve: async (_, args, context) => {
        const { req, res } = context;    // Get req and res from context.
        const user = await verifyTokenGraphQl(req, res);    // Check user for authauthentication.
        const { comment, productID, parent } = args;    // Get data from client.
        const blog = await checkExistProduct(productID);
        if (parent) {
            await getComment(Comment, parent);
            await Comment.updateOne({ _id: parent }, {
                $push: {
                    parent: {
                        comment,
                        user: user._id,
                        show: false,
                        openToComment: false
                    }
                }
            })
            return {    // Response
                status: StatusCodes.CREATED,
                data: {
                    message: 'Comment registration was done successfully: Parent',
                }
            }
        } else {
            await Comment.create({
                comment: comment,
                user: user._id,
                productID,
                show: false,
                openToComment: !parent,
            })
            return {    // Response
                status: StatusCodes.CREATED,
                data: {
                    message: 'Comment registration was done successfully: Main',
                }
            }

        }
    }
};



async function checkExistBlog(id) {
    await checkMongoIdGraphQl(id);    // Check mongoID.
    const blog = await Blog.findOne({ _id: id });    // Find blog.
    if (!blog) throw new Error('Blog is not defined');    // Create Error for not defined blog.
    return blog;
};

async function checkExistCourse(id) {
    await checkMongoIdGraphQl(id);    // Check mongoID.
    const blog = await Course.findOne({ _id: id });    // Find blog.
    if (!blog) throw new Error('Blog is not defined');    // Create Error for not defined blog.
    return blog;
};

async function checkExistProduct(id) {
    await checkMongoIdGraphQl(id);    // Check mongoID.
    const blog = await Product.findOne({ _id: id });    // Find blog.
    if (!blog) throw new Error('Product is not defined');    // Create Error for not defined blog.
    return blog;
};


async function getComment(model, id) {
    await checkMongoIdGraphQl(id);    // Check mongoID.
    const result = await model.findOne({ _id: id });    // Find comment.
    const comment = copyObject(result)
    if (!comment) throw new Error('comment is not defined');    // Create Error for not defined comment.
    return comment
};



module.exports = {
    CommentForBlogResolver,
    CommentForCourseResolver,
    CommentForProductResolver
};

