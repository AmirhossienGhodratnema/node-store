const Controller = require("../../controller");
const path = require('path');

// Options
const { unlinkPhoto, filesUpload, checkMongoId } = require("../../../../functions/golobal");
const { Product } = require('./../../../models/product');

module.exports = new class ProductController extends Controller {
    async create(req, res, next) {
        try {
            console.log(req.files);

            const checkingBody = await this.validationData(req);    // Data validation.
            if (checkingBody) throw { status: 400, message: checkingBody };    // Data error validation.
            const images = await filesUpload(req.files, req.body);    // Return the address of several photos
            const supplier = req.user._id;    // Get supplier

            let { image, title, shortText, shortDescription, description, tags,    // Get fiels in body.
                category, price, length, height, width, weight, coler, model
                , madein, type
            } = req.body;

            let features = {    // Set data in features
                length: length || 0,
                height: height || 0,
                width: width || 0,
                weight: weight || 0,
                coler: coler || 0,
                model: model || 0,
                madein: madein || 0,
            };

            await Product.create({ title, type, images, shortText, shortDescription, description, tags, category, price, features, supplier })    // Save the product in mongoDB.
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
            const product = await Product.find({});    // Get all products
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

    async getById(req, res, next) {
        try {
            const { id } = req.params;    // Get id from req.params.
            const result = await checkMongoId(id);    // Check mongoId.
            const product = await Product.findById(id);
            return res.json({
                product,
                message: 'PrGet product by id',
            });
        } catch (error) {
            next(error);
        };
    };
};