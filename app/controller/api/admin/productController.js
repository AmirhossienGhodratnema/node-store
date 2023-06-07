const Controller = require("../../controller");
const path = require('path');
const { Product } = require('./../../../models/product');

// Options
const { unlinkPhoto } = require("../../../../functions/golobal");
const product = require("./../../../models/product");



module.exports = new class ProductController extends Controller {
    async create(req, res, next) {
        try {
            if (req.body.filename) {
                req.body.image = path.join(req.body.fileUploadPath, req.body.filename);    //Add photo field in req.body.
                req.body.image = req.body.image.replace(/\\/g, '/');    // Replace ( \\ ) to ( / ) for url.
            };

            let { image, title } = req.body
            const product = await Product.create({ title, images: image })
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Create product',
                data: req.body,
                product
            });
        } catch (error) {
            const { fileUploadPath, filename } = req.body;    // Get fiels for unlinkPhoto.
            await unlinkPhoto(fileUploadPath, filename);     // Delete image.
            next(error);
        };
    };
};