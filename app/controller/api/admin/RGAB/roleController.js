const { StatusCodes } = require("http-status-codes");
const Controller = require("../../../controller");
const { Role } = require("../../../../models/role");
const { createError, deleteInvalidPropertyInObject, ValidationData } = require("../../../../../functions/golobal");




module.exports = new class RoleController extends Controller {


    async getList(req, res, next) {
        try {
            const role = await Role.find({})
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


    async remove(req, res, next) {
        try {
            const { id } = req.query;
            const role = await Role.findById(id);
            if (!role) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Role not defind');
            const removeRole = await Role.deleteOne({ '_id': id });
            if (removeRole.deletedCount == 0) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'The roll was not deleted');
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                success: true,
                message: 'Remove role ok',
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