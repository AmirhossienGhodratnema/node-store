const router = require('express').Router();
const { graphqlHTTP } = require('express-graphql');


// Routers
const { userRouters } = require('./user/userRoute');
const { developerRoute } = require('./developer');
const { AdminRouter } = require('./admin/admin');
const { indexPage } = require('./indexPage/indexPage');
const { verifyToken } = require('../../middleware/verifytoken');
const { chckRole } = require('./../../middleware/access');
const { graphqlConfig } = require('../../utils/graphql.Config');

router.use('/', indexPage);
router.use('/user', userRouters);
router.use('/admin', verifyToken, AdminRouter);

// chckRole('ADMIN')
router.use('/developer', developerRoute);


// GraphQl route
router.use('/graphql', graphqlHTTP(graphqlConfig));

module.exports = {
    homeRoute: router
};