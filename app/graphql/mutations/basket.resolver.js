const { GraphQLString, GraphQLInt } = require("graphql");
const { verifyTokenGraphQl } = require("../../middleware/verifytoken");
const { StatusCodes } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.type");
const { checkMongoIdGraphQl } = require("../../../functions/golobal");
const { Blog } = require("../../models/blog");
const { Product } = require("../../models/product");
const { Basket } = require("../../models/basket");

const addProductToBasket = {
    type: ResponseType,
    args: {
        productID: { type: GraphQLString },    // String type
    },
    resolve: async (_, args, context) => {
        const { req, res } = context;    // Get req and res from context.
        const user = await verifyTokenGraphQl(req, res);    // Check user for authauthentication.
        const { productID } = args;    // Get data from client.
        const product = await checkExistProduct(productID);    // Check blog
        if (product) {
            await Basket.updateOne({ user: user._id, 'product.product': productID }, {
                $inc: {
                    'product.$.count': 1
                }
            });
            return {    // Response like.
                status: StatusCodes.OK,
                data: {
                    message: 'Basket find',
                }
            };
        }
        // await Basket.create({
        //     user: user._id,
        //     product: { product: productID, count: 1 },
        // });
        return {    // Response like.
            status: StatusCodes.CREATED,
            data: {
                message: 'Basket',
            }
        };
    },
};

const removeProductToBasket = {
    type: ResponseType,
    args: {
        productID: { type: GraphQLString },    // String type
    },
    resolve: async (_, args, context) => {
        const { req, res } = context;    // Get req and res from context.
        const user = await verifyTokenGraphQl(req, res);    // Check user for authauthentication.
        const { productID } = args;    // Get data from client.
        const product = await checkExistProduct(productID);    // Check blog
        if (product) {
            await Basket.updateOne({ user: user._id, 'product.product': productID }, {
                $inc: {
                    'product.$.count': 1
                }
            });
            return {    // Response like.
                status: StatusCodes.OK,
                data: {
                    message: 'Basket find',
                }
            };
        }
        // await Basket.create({
        //     user: user._id,
        //     product: { product: productID, count: 1 },
        // });
        return {    // Response like.
            status: StatusCodes.CREATED,
            data: {
                message: 'Basket',
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
    addProductToBasket,
};

