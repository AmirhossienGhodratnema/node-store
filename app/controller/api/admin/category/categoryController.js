const { check, body } = require("express-validator");
const { Category } = require("../../../../models/categorys");
const Controller = require("../../../controller");

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
            // const category = await Category.aggregate([
            //     {
            //         $lookup: {
            //             from: 'categories',
            //             localField: '_id',
            //             foreignField: 'parent',
            //             as: 'child'
            //         },
            //     },
            //     {
            //         $project: {
            //             __v: 0,
            //             'child.__v': 0,
            //             'child.parent': 0
            //         }
            //     },
            // ]);
            const category = await Category.aggregate([
                {
                    $graphLookup: {
                        from: 'categories',
                        startWith: '$_id',
                        connectFromField: '_id',
                        connectToField: 'parent',
                        maxDepth: 5,
                        depthField: 'depth',
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


    // async getAllCategoryPOPInMethod(req, res, next) {    // Getting data in the form of populit in the controller
    //     try {
    //         const categories = await Category.find({}, { '_id': 0, '__v': 0, 'id': 0 }).populate({
    //             path: 'parent',
    //             select: { '_id': 0, '__v': 0, 'id': 0 },
    //             populate: [
    //                 {
    //                     path: 'parent',
    //                     select: { '_id': 0, '__v': 0, 'id': 0 }
    //                 }
    //             ]
    //         });
    //         return res.status(200).json(categories);
    //     } catch (error) {
    //         next(error);
    //     };
    // };

    async getAllPre(req, res, next) {
        try {
            const categories = await Category.find({});
            return res.status(200).json({ categories });
        } catch (error) {
            next(error);
        };
    };

    async removeOne(req, res, next) {
        try {
            const { id } = req.params;
            const check = await this.checkExistItem(id);

            const deleteCategory = await Category.deleteMany({
                $or: [
                    { _id: check._id },
                    { parent: check._id },
                ]
            });
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

    async edit(req, res, next) {    // Update categories (title)
        try {
            const { id, title } = req.body;
            const checkingBody = await this.validationData(req);
            if (checkingBody) throw { status: 400, message: checkingBody };
            const category = await this.checkExistItem(id);
            const editData = await Category.updateOne({ '_id': id }, { $set: { title: title } })
            if (editData.modifiedCount == 0) throw { status: 400, message: 'The update was not done (it is duplicate)' }
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'The changes were made successfully'
            });
        } catch (error) {
            next(error);
        };
    };
    // --------------------- Tools ---------------------

    async checkExistItem(id) {
        const result = await Category.findOne({ '_id': id });
        if (!result) throw { status: 400, message: 'There is no such category' }
        return result
    };

};