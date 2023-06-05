const Controller = require("../../controller");

// Models
const { Blog } = require("../../../models/blog");
const { Category } = require("../../../models/categorys");

// Options
const path = require('path');
const { unlinkPhoto } = require("../../../../functions/golobal");



module.exports = new class BlogController extends Controller {
    async create(req, res, next) {
        try {
            const checkingBody = await this.validationData(req);    // Data validation.
            if (checkingBody) throw { status: 400, message: checkingBody };    // Data error validation.
            req.body.image = path.join(req.body.fileUploadPath, req.body.filename);    //Add photo field in req.body.
            req.body.image = req.body.image.replace(/\\/g, '/');    // Replace ( \\ ) to ( / ) for url.
            let { title, category, text, shortText, tag, image } = req.body;    // Getting the fields to create a blog.
            const author = req.user
            const blog = await Blog.create({ author, title, category, text, shortText, tag, image });    // Create blog in DB
            console.log('author', author)
            return res.status(201).json({
                status: 201,
                success: true,
                data: 'Create blog is ok',
            });
        } catch (error) {
            const { fileUploadPath, filename } = req.body;    // Get fiels for unlinkPhoto.
            await unlinkPhoto(fileUploadPath, filename);     // Delete image.
            next(error);
        };
    };


    async getAllBlogs(req, res, next) {
        try {
            const blogs = await Blog.aggregate([
                {
                    $lookup: {    // Display user iinformation
                        from: 'users',    // From users collection.
                        localField: 'author',    // Select the field that I want to display in the information blog.
                        foreignField: '_id',    // The field we get in users.
                        as: 'author'
                    }
                },
                {
                    $unwind: '$author'    // Take out of presentation mode.
                },
                {
                    $project: {    // Do not display these values to the user.
                        'author.otp': 0,
                        'author.bills': 0,
                        'author.rols': 0,
                        'author.__v': 0,
                        'author._id': 0,
                        'author.disCount': 0,

                    }
                },
                {
                    $lookup: {    // Display category iinformation
                        from: 'categories',    // From categories collection.
                        localField: 'category',    // Select the field that I want to display in the information blog.
                        foreignField: '_id',    // The field we get in categories.
                        as: 'category'
                    }
                },

                {
                    $project: {    // Do not display these values to the category.
                        'category._id': 0,
                        'category.__v': 0,
                    }
                }
            ]);
            return res.status(200).json({
                status: 200,
                success: true,
                blogs,
            })
        } catch (error) {
            next(error);
        };
    };
};