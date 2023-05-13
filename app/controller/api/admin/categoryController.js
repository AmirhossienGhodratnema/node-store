const { Category } = require("../../../models/categorys");
const Controller = require("../../controller");



module.exports = new class CategoryController extends Controller {
    async create(req, res, next) {
        try {
            const { title, parent } = req.body;
            const checkingBody = await this.validationData(req);
            if (checkingBody) throw { status: 400, message: checkingBody };
            const category = await Category.create({ title, parent });
            console.log(category)
            return res.json('Category');
        } catch (error) {
            next(error);
        };
    };
};