const { GraphQLList } = require("graphql");
const { verifyTokenGraphQl } = require("../../middleware/verifytoken");
const { createError } = require("../../../functions/golobal");
const { StatusCodes } = require("http-status-codes");
const { CourseType } = require("../typeDefs/courseType");
const { Course } = require("../../models/course");


const CourseResolver = {
    type: new GraphQLList(CourseType),
    resolve: async (_, args, context) => {
        const { req, res } = context
        const user = await verifyTokenGraphQl(req, res);
        if (!user) await createError(StatusCodes.NOT_FOUND, 'User is not found');
        return await Course.find({})
    }
};

module.exports = { CourseResolver };

