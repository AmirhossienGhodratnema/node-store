const { GraphQLList } = require("graphql");
const { BlogType } = require("../typeDefs/blogType");
const { Blog } = require("../../models/blog");


const BlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async () => {
        return await Blog.find({}).populate([{ path: 'author' }, { path: 'category' }]);
    }
};

module.exports = { BlogResolver };

