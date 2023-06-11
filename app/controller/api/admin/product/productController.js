const Controller = require("../../../controller");
const path = require('path');
const { StatusCodes } = require('http-status-codes')
// Options
const { unlinkPhoto, filesUpload, checkMongoId } = require("../../../../../functions/golobal");
const { Product } = require('../../../../models/product');


const BlockList = {    // Create enum in js
    NAME: 'Amirhossein',
    LASTNAME: 'ghodratnema',
}
Object.freeze(BlockList);



module.exports = new class ProductController extends Controller {
    async create(req, res, next) {
        try {
            const checkingBody = await this.validationData(req);    // Data validation.
            if (checkingBody) throw { status: 400, message: checkingBody };    // Data error validation.
            const images = await filesUpload(req.files, req.body);    // Return the address of several photos
            const supplier = req.user._id;    // Get supplier
            let { image, title, shortText, shortDescription, description, tags,    // Get fiels in body.
                category, price, lengths, height, width, weight, coler, model
                , madein, type
            } = req.body;
            let features = {    // Set data in features
                lengths: lengths || 0,
                height: height || 0,
                width: width || 0,
                weight: weight || 0,
                coler: coler || 0,
                model: model || 0,
                madein: madein || 0,
            };
            await Product.create({ title, type, images, shortText, shortDescription, description, tags, category, price, features, supplier })    // Save the product in mongoDB.
            return res.status(200).json({
                status: StatusCodes.OK,
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
                status: StatusCodes.OK,
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
            await checkMongoId(id);    // Check mongoId.
            const product = await Product.findById(id);    // Get Product
            return res.json({
                product,
                message: 'PrGet product by id',
            });
        } catch (error) {
            next(error);
        };
    };


    async edti(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            let { lengths, height, width, weight, coler, model, madein } = req.body; // Get fiels in body.
            await checkMongoId(id);    // Check mongoId.
            const product = await Product.findById(id);    // Get product.
            if (!product) throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: 'There is no such product' }
            const checkingBody = await this.validationData(req);    // Data validation.
            if (checkingBody) throw { status: 400, message: checkingBody };    // Data error validation.
            const images = await filesUpload(req.files, req.body);    // Return the address of several photos
            let features = {    // Set data in features
                lengths: lengths || product.features.lengths,
                height: height || product.features.height,
                width: width || product.features.width,
                weight: weight || product.features.weight,
                coler: coler || product.features.coler,
                model: model || product.features.model,
                madein: madein || product.features.madein,
            };   // Set item features in object.
            const blockList = ['supplier', 'delete'];    // Movies that are not updated when changing.

            Object.keys(data).map(key => {    // Validation features data.
                // if (featuresList.includes(key)) features[key] = data[key];    // Setting lists of features  
                if (blockList.includes(key)) delete data[key];    // Delete the files that need to be updated
                if (typeof data[key] == 'string') data[key] = data[key].trim();    // Trim the value of each field.
                if (Array.isArray(data[key]) && Array.length > 0) data[key] = data[key].map(item => item.trim());    // Validating presentation indexes in fields that are presentations.
                if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]    // Deleting the presentation data whose field value is zero.
            });


            const resultUpdateProduct = await Product.updateOne({ _id: product._id }, { $set: { data, images, features } });    // Updating the product based on ID
            if (resultUpdateProduct.matchedCount == 0) throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Product update was not done' };    // Send Product update was not done Error
            return res.status(StatusCodes.OK).json({    // Correct response
                status: StatusCodes.OK,
                success: true,
                message: 'Edit product true',
            });
        } catch (error) {
            if (req?.body?.fileUploadPath && req?.body?.filename) {
                const { fileUploadPath, filename } = req.body;    // Get fiels for unlinkPhoto.
                await unlinkPhoto(fileUploadPath, filename);     // Delete image.
            }
            next(error);
        };
    };

    async productSearch(req, res, next) {
        try {
            let { search } = req.params;    // Get params.
            search = search.toLowerCase();    // Change to lowerCase.
            let product;    // Global variable.
            if (search) {
                product = await Product.find({ $text: { $search: new RegExp(search, 'gi') } });    // Search based on the given value.
                return res.status(StatusCodes.OK).json({
                    status: StatusCodes.OK,
                    success: true,
                    product
                })
            } else {
                product = await Product.find({});    // Find all product.
                return res.status(StatusCodes.OK).json({
                    status: StatusCodes.OK,
                    success: true,
                    product,
                });
            }
        } catch (error) {
            next(error);
        };
    };


    async remove(req, res, next) {
        try {
            const { id } = req.params;    // Get id from req.params.
            await checkMongoId(id);    // Check mongoId.
            const product = await Product.findById(id);
            if (!product) throw { status: 400, message: 'There is no such product' }
            const resutlRemove = await Product.deleteOne({ _id: id });
            if (resutlRemove.deletedCount == 0) throw { status: 400, message: 'The delete operation failed' };
            return res.json({
                status: 200,
                success: true,
                message: 'Remove',
                product
            })
        } catch (error) {
            next(error);
        };
    };
};