const { GraphQLString, GraphQLInt } = require("graphql");
const { verifyTokenGraphQl } = require("../../middleware/verifytoken");
const { StatusCodes } = require("http-status-codes");
const { ResponseType, AnyType } = require("../typeDefs/public.type");
const { checkMongoIdGraphQl } = require("../../../functions/golobal");
const { Blog } = require("../../models/blog");
const { Product } = require("../../models/product");
const { Basket } = require("../../models/basket");
const { copyObject } = require("../../utils/auth");

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
        // user: userID, 'product.product': productID
        const basket = await Basket.findOne({ 'product.product': productID });
        console.log(product)
        console.log(basket)
        if (product && basket) {
            await Basket.updateOne({ user: user._id, 'product.product': productID }, {
                $inc: {
                    'product.$.count': 1
                }
            });
            return {    // Response like.
                status: StatusCodes.OK,
                data: {
                    message: 'The number of products increased',
                }
            };
        } else {
            await Basket.create({
                user: user._id,
                product: { product: productID, count: 1 },
            });
            return {    // Response like.
                status: StatusCodes.CREATED,
                data: {
                    message: 'The product has been added to the shopping cart',
                }
            };
        }


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
        const basket = await getBasket(productID, user._id);
        console.log(basket.product[0].count > 2)
        if (product && basket?.product[0]?.count > 1) {
            await Basket.updateOne({ user: user._id, 'product.product': productID }, {
                $inc: {
                    'product.$.count': -1
                }
            });
            return {    // Response like.
                status: StatusCodes.OK,
                data: {
                    message: 'The number of products in the shopping cart has decreased',
                }
            };
        } else {
            await removeBasket(productID, user._id);
            return {    // Response like.
                status: StatusCodes.OK,
                data: {
                    message: 'The product was removed from the shopping cart',
                }
            };
        }

    },
};









async function checkExistProduct(id) {
    await checkMongoIdGraphQl(id);    // Check mongoID.
    const blog = await Product.findOne({ _id: id });    // Find blog.
    if (!blog) throw new Error('Product is not defined');    // Create Error for not defined blog.
    return blog;
};


async function getBasket(productID, userID) {
    await checkMongoIdGraphQl(productID);
    const basket = await Basket.findOne({ user: userID, 'product.product': productID });
    if (!basket) throw new Error('Basket is not defined');
    return basket;
}
async function removeBasket(productID, userID) {
    await checkMongoIdGraphQl(productID);
    const basket = await Basket.deleteOne({ user: userID, 'product.product': productID });
    if (basket.deletedCount == 0) throw new Error('Basket is not defined');
    return basket;
}


module.exports = {
    addProductToBasket,
    removeProductToBasket
};

