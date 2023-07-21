const { GraphQLString } = require("graphql");
const { verifyTokenGraphQl } = require("../../middleware/verifytoken");
const { StatusCodes } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.type");
const { checkMongoIdGraphQl } = require("../../../functions/golobal");
const { Blog } = require("../../models/blog");
const { Product } = require("../../models/product");

const bookmarkForBlogResolver = {
    type: ResponseType,
    args: {
        blogID: { type: GraphQLString },    // String type
    },
    resolve: async (_, args, context) => {
        const { req, res } = context;    // Get req and res from context.
        const user = await verifyTokenGraphQl(req, res);    // Check user for authauthentication.
        const { blogID } = args;    // Get data from client.
        const blog = await checkExistBlog(blogID);    // Check blog
        const getBlog = await Blog.findOne({ _id: blogID, bookMarks: user._id });    // Getting a blog based on blog ID and user ID
        console.log('getBlog', getBlog)
        if (getBlog) {    // 
            await Blog.updateOne({ _id: blogID, bookMarks: user._id }, {
                $pull: { bookMarks: user._id }
            });
            return {    // Response dislike.
                status: StatusCodes.OK,
                data: {
                    message: 'Bookmark removed',
                }
            };
        }
        await Blog.updateOne({ _id: blogID }, {
            $push: { bookMarks: user._id }
        });
        return {    // Response like.
            status: StatusCodes.CREATED,
            data: {
                message: 'Bookmark added',
            }
        };
    },
};


const LikeForProductResolver = {
    type: ResponseType,
    args: {
        productID: { type: GraphQLString },    // String type
    },
    resolve: async (_, args, context) => {
        const { req, res } = context;    // Get req and res from context.
        const user = await verifyTokenGraphQl(req, res);    // Check user for authauthentication.
        const { productID } = args;    // Get data from client.
        const product = await checkExistProduct(productID);    // Check product


        // const getProduct = await Product.findOne({ _id: productID, likes: user._id });    // Getting a Product based on blog ID and user ID
        // console.log('getProduct', getProduct);
        // if (getProduct) {    // 
        //     await Product.updateOne({ _id: productID }, {
        //         $pull: { likes: user._id }
        //     });
        //     return {    // Response dislike.
        //         status: StatusCodes.OK,
        //         data: {
        //             message: 'Dislike',
        //         }
        //     };
        // }
        // await Product.updateOne({ _id: productID }, {
        //     $push: { likes: user._id }
        // });
        return {    // Response like.
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

async function checkExistProduct(id) {
    await checkMongoIdGraphQl(id);    // Check mongoID.
    const blog = await Product.findOne({ _id: id });    // Find blog.
    if (!blog) throw new Error('Product is not defined');    // Create Error for not defined blog.
    return blog;
};


module.exports = {
    bookmarkForBlogResolver,
};

