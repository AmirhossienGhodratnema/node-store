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
            return res.json({
                status: 200,
                success: true,
                message: 'Category created successfully'
            });
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


    async removeOne(req, res, next) {
        try {
            const { id } = req.params;
            const check = await this.checkExistItem(id);
            console.log(check)

            const deleteCategory = await Category.deleteOne({ '_id': id });
            if (deleteCategory.deletedCount == 0) throw { status: 400, message: 'The delete operation failed' };
            return res.json({
                status: 200,
                success: true,
                message: 'The deletion was successful'
            })
        } catch (error) {
            next(error);
        };
    };


    // --------------------- Tools ---------------------

    async checkExistItem(id) {
        const result = await Category.findOne({ '_id': id });
        if (!result) throw { status: 400, message: 'There is no such category' }
        return !!result
    };

};