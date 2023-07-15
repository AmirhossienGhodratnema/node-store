const { GraphQLList, GraphQLString } = require("graphql");
const { verifyTokenGraphQl } = require("../../middleware/verifytoken");
const { createError } = require("../../../functions/golobal");
const { StatusCodes } = require("http-status-codes");
const { CommentType } = require("../typeDefs/commentType");
const { Course } = require("../../models/course");


const CommentForBlogResolver = {
    type: new GraphQLList(CommentType),
    args: {
        comment: { type: GraphQLString },
        blogID: { type: GraphQLString },
        parent: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {


        const { comment, blogID, parent } = args;
        console.log({comment, blogID});
        return { comment, blogID, parent };

        // const { req, res } = context
        // const user = await verifyTokenGraphQl(req, res);
        // const { test } = args;
        // if (!user) await createError(StatusCodes.NOT_FOUND, 'User is not found');
    }
};

module.exports = { CommentForBlogResolver };

