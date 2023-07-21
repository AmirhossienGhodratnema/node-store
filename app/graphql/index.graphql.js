
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { ProductResolver } = require('./queries/product.Resolver');
const { BlogResolver } = require('./queries/blog.resolver');
const { CategoryResolver, CategoryChildResolver } = require('./queries/category.resolver');
const { CourseResolver } = require('./queries/course.resolver');
const { getUserBookmarkProduct, getUserBookmarkBlog } = require('./queries/userProfile.Resolver')
const { CommentForBlogResolver, CommentForCourseResolver, CommentForProductResolver } = require('./mutations/comment.resolver');
const { LikeForBlogResolver, LikeForProductResolver } = require('./mutations/like.resolver');
const { bookmarkForBlogResolver, bookmarkForProductResolver } = require('./mutations/bookmark.resolver');
const { addProductToBasket } = require('./mutations/basket.resolver');

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        blog: BlogResolver,
        product: ProductResolver,
        category: CategoryResolver,
        categoryParent: CategoryChildResolver,
        courses: CourseResolver,
        getUserBookmarkProduct,
        getUserBookmarkBlog
    }
});


const rootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        CommentForBlogResolver,
        CommentForCourseResolver,
        CommentForProductResolver,
        LikeForBlogResolver,
        LikeForProductResolver,
        bookmarkForBlogResolver,
        bookmarkForProductResolver,
        addProductToBasket
    }
});


const grSQL = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
});

module.exports = { grSQL };