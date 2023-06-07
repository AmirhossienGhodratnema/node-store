const Controller = require("../../controller");
const path = require('path');
const { Product } = require('./../../../models/product');

// Options
const { unlinkPhoto, filesUpload } = require("../../../../functions/golobal");
const product = require("./../../../models/product");



module.exports = new class ProductController extends Controller {
    async create(req, res, next) {
        try {
            console.log(req.files);
         
            const checkingBody = await this.validationData(req);    // Data validation.
            if (checkingBody) throw { status: 400, message: checkingBody };    // Data error validation.
            const images = await filesUpload(req.files , req.body);    // Return the address of several photos
        

            let { image, title, shortText, shortDescription, description, tags,    // Get fiels in body.
                category, price, length, height, width, weight, coler, model
                , madein } = req.body;

            let features = {    // Set data in features
                length, height, width, weight,
                coler, model, madein
            };

            await Product.create({ title, images, shortText, shortDescription, description, tags, category, price, features })    // Save the product in mongoDB.
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
};