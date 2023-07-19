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
            const comment = await getComment(parent);
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








        // await checkExistBlog(blogID);
        // let commentDocuments;
        // if (parent) commentDocuments = await getComment(Blog, parent);    // Get comment for check.
        // if(commentDocuments && !commentDocuments.openToComment) throw new Error('You are not allowed to post comments');


        // await Blog.updateOne({ _id: blogID }, {
        //     $push: {
        //         comments: {
        //             comment,
        //             user: await user._id,
        //             show: false,
        //             openToComment: !parent,
        //             parent,
        //         }
        //     }
        // });


    }
};

async function checkExistBlog(id) {
    await checkMongoIdGraphQl(id);    // Check mongoID.
    const blog = await Blog.findOne({ _id: id });    // Find blog.
    if (!blog) throw new Error('Blog is not defined');    // Create Error for not defined blog.
    return blog;
};

async function getComment(id) {
    await checkMongoIdGraphQl(id);    // Check mongoID.
    const result = await Comment.findOne({ _id: id });    // Find comment.
    const comment = copyObject(result)
    if (!comment) throw new Error('comment is not defined');    // Create Error for not defined comment.
    return comment
};



module.exports = { CommentForBlogResolver };

