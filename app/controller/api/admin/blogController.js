const Controller = require("../../controller");

// Models
const { Blog } = require("../../../models/blog");
const { Category } = require("../../../models/categorys");

// Options
const path = require('path');



module.exports = new class BlogController extends Controller {
    async create(req, res, next) {
        try {
            const checkingBody = await this.validationData(req);
            if (checkingBody) throw { status: 400, message: checkingBody };
            req.body.image = path.join(req.body.fileUploadPath, req.body.filename)
            req.body.image = req.body.image.replace(/\\/g, '/');
            let { title, category, text, shortText, tag, image } = req.body;

            const blog = await Blog.create({ title, category, text, shortText, tag, image })
            console.log('blog', blog)
            return res.status(200).json({
                status: 200,
                success: true,
                data: 'Blog controller is ok ...........',
            });
        } catch (error) {
            next(error);
        };
    };
};