const Controller = require("../../controller");
const path = require('path');
const { Product } = require('./../../../models/product');

// Options
const { unlinkPhoto } = require("../../../../functions/golobal");
const product = require("./../../../models/product");



module.exports = new class ProductController extends Controller {
    async create(req, res, next) {
        try {
            const checkingBody = await this.validationData(req);    // Data validation.
            if (checkingBody) throw { status: 400, message: checkingBody };    // Data error validation.

            if (req.body.filename) {
                req.body.image = path.join(req.body.fileUploadPath, req.body.filename);    //Add photo field in req.body.
                req.body.image = req.body.image.replace(/\\/g, '/');    // Replace ( \\ ) to ( / ) for url.
            };
            let { image, title, shortText, shortDescription, description, tags, category, price } = req.body;    // Get fiels in body.
            await Product.create({ title, images: image, shortText, shortDescription, description, tags, category, price })    // Save the product in mongoDB.
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'The product has been successfully registered',
            });
        } catch (error) {
            if (req?.body?.fileUploadPath && req?.body?.filename) {
                const { fileUploadPath, filename } = req.body;    // Get fiels for unlinkPhoto.
                await unlinkPhoto(fileUploadPath, filename);     // Delete image.
            }
            next(error);
        };
    };


    async getAll(req, res, next) {
        try {
            const product = await Product.find({});
            if (!product) throw { status: 400, message: 'There is no product' };
            return res.status(200).json({
                status: 200,
                success: true,
                product
            })
        } catch (error) {
            next(error);
        };
    };
};