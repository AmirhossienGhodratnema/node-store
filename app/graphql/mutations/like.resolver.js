const { GraphQLString } = require("graphql");
const { verifyTokenGraphQl } = require("../../middleware/verifytoken");
const { StatusCodes } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.type");
const { checkMongoIdGraphQl } = require("../../../functions/golobal");
const { Blog } = require("../../models/blog");

const LikeForBlogResolver = {
    type: ResponseType,
    args: {
        blogID: { type: GraphQLString },    // String type
    },
    resolve: async (_, args, context) => {
        const { req, res } = context;    // Get req and res from context.
        const user = await verifyTokenGraphQl(req, res);    // Check user for authauthentication.
        const { blogID } = args;    // Get data from client.
        const blog = await checkExistBlog(blogID);

        const getBlog = await Blog.findOne({ _id: blogID, likes: user._id })
        console.log('getBlog', getBlog);
        if (getBlog) {
            await Blog.updateOne({ _id: blogID }, {
                $pull: { likes: user._id }
            });
            return {    // Response
                status: StatusCodes.CREATED,
                data: {
                    message: 'Dislike',
                }
            };
        }
        await Blog.updateOne({ _id: blogID }, {
            $push: { likes: user._id }
        });
        return {    // Response
            status: StatusCodes.CREATED,
            data: {
                message: 'Like',
            }
        };
    },
};

async function checkExistBlog(id) {
    await checkMongoIdGraphQl(id);    // Check mongoID.
    const blog = await Blog.findOne({ _id: id });    // Find blog.
    if (!blog) throw new Error('Blog is not defined');    // Create Error for not defined blog.
    return blog;
};

module.exports = {
    LikeForBlogResolver,
};

