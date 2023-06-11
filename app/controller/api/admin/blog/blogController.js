const Controller = require("../../../controller");

// Models
const { Blog } = require("../../../../models/blog");
const { Category } = require("../../../../models/categorys");

// Options
const path = require('path');
const { unlinkPhoto } = require("../../../../../functions/golobal");



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
            if (req?.body?.fileUploadPath && req?.body?.filename) {
                const { fileUploadPath, filename } = req.body;    // Get fiels for unlinkPhoto.
                await unlinkPhoto(fileUploadPath, filename);     // Delete image.
            }
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


    async getBlogId(req, res, next) {
        try {
            const blog = await this.findBlog(req.params);    // Get blog.
            return res.status(200).json({
                status: 200,
                success: true,
                blog
            })
        } catch (error) {
            next(error);
        };
    };


    async remove(req, res, next) {
        try {
            const { id } = req.params;
            await this.findBlog(req.params);
            const remove = await Blog.deleteOne({ _id: id });
            if (remove.deletedCount == 0) {
                throw { status: 400, message: 'The delete operation failed' };
            };
            return res.json({
                status: 200,
                success: true,
                message: 'Blog is deleted'
            });
        } catch (error) {
            next(error);
        };
    };


    async updateBlog(req, res, next) {
        try {
            const { id } = req.params    // Get id in params
            // const checkingBody = await this.validationData(req);    // Data validation.
            // if (checkingBody) throw { status: 400, message: checkingBody };    // Data error validation.
            if (req.body.filename) {
                req.body.image = path.join(req.body.fileUploadPath, req.body.filename);    //Add photo field in req.body.
                req.body.image = req.body.image.replace(/\\/g, '/');    // Replace ( \\ ) to ( / ) for url.
            };
            const blog = await this.findBlog(req.params);    // Get one blog find id.
            const data = req.body;    // Data to be updated 
            const blockList = ['author', 'comments', 'likes', 'disLikes', 'bookMarks'];    // Movies that are not updated when changing.
            const illegal = ['', ' ', '0', 0, -1, null, undefined];
            Object.keys(data).forEach((key) => {    // Object navigation to check specific items !!!
                if (blockList.includes(key)) delete data[key];    // Deletes the fields that are in the block list.
                if (typeof data[key] == 'string') data[key] = data[key].trim();    // Trim the value of each field.
                if (Array.isArray(data[key]) && Array.length > 0) data[key] = data[key].map(item => item.trim());    // Validating presentation indexes in fields that are presentations.
                if (illegal.includes(key)) delete data[key];    // Removes unauthorized fields.
            });
            const resultUpdate = await Blog.updateOne({ _id: id }, { $set: data });    // The operation of updating fields.
            if (resultUpdate.modifiedCount == 0) throw { status: 400, message: 'Changes were not applied' };    // Error if the field is not updated.
            return res.status(200).json({
                status: 200,
                success: true,
                data: 'The blog has been successfully updated',
            });
        } catch (error) {
            const { fileUploadPath, filename } = req.body;    // Get fiels for unlinkPhoto.
            await unlinkPhoto(fileUploadPath, filename);     // Delete image.
            next(error);
        };
    };





    async findBlog(query = {}) {    // Find one blog.
        const { id } = query;    // Getting the query from the paramet.
        const blog = await Blog.findOne({ _id: id }).populate([
            {
                path: 'author',
                select: {
                    '_id': 0,
                    'otp': 0,
                    'bills': 0,
                    'rols': 0,
                    '__v': 0,
                    'disCount': 0,
                }
            },
            {
                path: 'category',
            }
        ]);    // Get blog
        if (!blog) throw { status: 400, message: 'There is no blog' };    // Blog error
        return blog    // Return blog
    };


};