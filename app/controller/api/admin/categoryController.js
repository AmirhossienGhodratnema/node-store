const { check, body } = require("express-validator");
const { Category } = require("../../../models/categorys");
const Controller = require("../../controller");

module.exports = new class CategoryController extends Controller {
    async create(req, res, next) {
        try {
            const { title, parent } = req.body;
            const checkingBody = await this.validationData(req);
            if (checkingBody) throw { status: 400, message: checkingBody };
            const category = await Category.create({ title, parent });
            return res.json('Category');
        } catch (error) {
            next(error);
        };
    };

    async getAllParents(req, res, next) {
        try {
            const category = await Category.find({ parent: undefined });
            return res.status(200).json({
                status: 200,
                success: true,
                category
            });
        } catch (error) {
            next(error);
        };
    };
};