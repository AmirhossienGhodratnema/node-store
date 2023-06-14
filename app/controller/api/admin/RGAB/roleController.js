const { StatusCodes } = require("http-status-codes");
const Controller = require("../../../controller");
const { Role } = require("../../../../models/role");
const { createError, deleteInvalidPropertyInObject, ValidationData } = require("../../../../../functions/golobal");




module.exports = new class RoleController extends Controller {


    async getList(req, res, next) {
        try {
            const role = await Role.find({}).populate([
                { path: 'permissions' }
            ]);
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                role
            })
        } catch (error) {
            next(error);
        };
    };

    async create(req, res, next) {
        try {
            const { title } = req.body;
            await ValidationData(req);
            await deleteInvalidPropertyInObject(req.body, [], ['title', 'description'])
            const checkTitle = await this.checkTitleRol(title);
            const role = await Role.create({ title: checkTitle });
            console.log(role)
            return res.json({
                status: StatusCodes.CREATED,
                success: true,
                message: 'Role created',
            })
        } catch (error) {
            next(error);
        };
    };



    async checkTitleRol(title) {
        let replaceTitle = title.replace(' ', '#');
        const checkRole = await Role.findOne({ title: replaceTitle });
        if (checkRole) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Role is dublicated');
        return replaceTitle;
    }
};