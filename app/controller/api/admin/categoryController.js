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


    async getChild(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.find({ parent: id });
            if (!category) throw { status: 400, message: 'This category has no children' };
            return res.status(200).json({
                status: 200,
                success: true,
                category
            });
        } catch (error) {
            next(error);
        };
    };


    async getAllCategory(req, res, next) {
        try {
            const category = await Category.aggregate([
                {
                    $lookup: {
                        from: 'categories',
                        localField: '_id',
                        foreignField: 'parent',
                        as: 'child'
                    },
                },
                {
                    $project: {
                        __v: 0,
                        'child.__v': 0,
                        'child.parent': 0
                    }
                },
            ]);
            return res.status(200).json(category);
        } catch (error) {
            next(error);
        };
    };
};