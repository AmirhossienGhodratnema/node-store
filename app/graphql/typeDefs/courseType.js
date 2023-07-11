const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { AuthorType, CategoryType } = require("./public.type");






const EpisodeType = new GraphQLObjectType({
    name: 'episodeType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        type: { type: GraphQLString },
        time: { type: GraphQLString },
        video: { type: GraphQLString },
        description: { type: GraphQLString },
    }
});


const ChapterType = new GraphQLObjectType({
    name: 'chapterType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        episodes: { type: new GraphQLList(EpisodeType) },
    }
});


const CourseType = new GraphQLObjectType({
    name: 'courseType',
    fields: {
        _id: { type: GraphQLString },
        author: { type: AuthorType },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        shortText: { type: GraphQLString },
        shortDescription: { type: GraphQLString },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        category: { type: new GraphQLList(CategoryType) },
        image: { type: GraphQLString },
        price: { type: GraphQLString },
        discount: { type: GraphQLString },
        type: { type: GraphQLString },
        time: { type: GraphQLString },
        status: { type: GraphQLString },
        format: { type: GraphQLString },
        tag: { type: new GraphQLList(GraphQLString) },
        imageUrl: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        chapters: { type:new GraphQLList(ChapterType) },
        // teacher: { type: GraphQLString },
        // comments: { type:new GraphQLList(CategoryType) },
        // likes: { type:new GraphQLList(CategoryType) },
        // disLikes: { type:new GraphQLList(disLikes) },
        // bookMarks: { type:new GraphQLList(disLikes) },
        // students: { type:new GraphQLList(disLikes) },
    }
});

module.exports = { CourseType };
