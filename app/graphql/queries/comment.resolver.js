const { GraphQLList, GraphQLString } = require("graphql");
const { verifyTokenGraphQl } = require("../../middleware/verifytoken");
const { createError } = require("../../../functions/golobal");
const { StatusCodes } = require("http-status-codes");
const { CommentType } = require("../typeDefs/commentType");
const { Course } = require("../../models/course");
const { Blog } = require("../../models/blog");
const { ResponseType } = require("../typeDefs/public.type");


const CommentForBlogResolver = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },
        blogID: { type: GraphQLString },
        parent: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req, res } = context;
        const user = await verifyTokenGraphQl(req, res);
        if (!user) await createError(StatusCodes.NOT_FOUND, 'User is not found');
        const { comment, blogID, parent } = args;
        const blog = await Blog.find({ _id: blogID });
        if (!blog) await createError(StatusCodes.NOT_FOUND, 'There is no blog');
        // const blog = await checkExistBlog(blogID);
        await console.log('blog', blog);
        await Blog.updateOne({ _id: blogID }, {
            $push: {
                comments:
                {
                    user: user._id,
                    comment,
                    parent,
                    show: false,
                    openToComment: !parent,
                }
            }
        });

        return {
            status: StatusCodes.CREATED,
            data: {
                message: 'Comment registration was done successfully',
            }
        }
    }
};

async function checkExistBlog(id) {
    const blog = await Blog.find({ id });
    if (!blog) await createError(StatusCodes.NOT_FOUND, 'There is no blog');
    return blog;
}

module.exports = { CommentForBlogResolver };

