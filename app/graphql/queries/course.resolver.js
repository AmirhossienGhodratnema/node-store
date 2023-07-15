const { GraphQLList, GraphQLString } = require("graphql");
const { verifyTokenGraphQl } = require("../../middleware/verifytoken");
const { createError } = require("../../../functions/golobal");
const { StatusCodes } = require("http-status-codes");
const { CourseType } = require("../typeDefs/courseType");
const { Course } = require("../../models/course");


const CourseResolver = {
    type: new GraphQLList(CourseType),
    args: {
        category: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await verifyTokenGraphQl(req, res);
        const { category } = args;
        const findQuery = category ? { category } : {}
        if (!user) await createError(StatusCodes.NOT_FOUND, 'User is not found');
        return await Course.find(findQuery)
    }
};

module.exports = { CourseResolver };

