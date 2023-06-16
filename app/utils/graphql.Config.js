const { grSQL } = require("../graphql/index.graphql");

function graphqlConfig(req, res) {
    return {
        schema: grSQL,
        graphiql: true,
        context: { req, res }
    };
};

module.exports = { graphqlConfig }