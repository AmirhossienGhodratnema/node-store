const { StatusCodes } = require("http-status-codes");
const Controller = require("../../../controller");
const { Role } = require("../../../../models/role");
const { createError, deleteInvalidPropertyInObject, ValidationData } = require("../../../../../functions/golobal");




module.exports = new class RoleController extends Controller {


    async getList(req, res, next) {
        try {
            const role = await Role.find({}).populate([{ path: 'permissions' }])
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
            const data = req.body;
            await ValidationData(req);
            // return res.json(data);

            await deleteInvalidPropertyInObject(req.body, [], ['title', 'description', 'permissions'])
            const checkTitle = await this.checkTitleRol(data.title);
            const role = await Role.create({ title: checkTitle, description: data.description, permissions: data.permissions });
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
            const { id } = req.params;
            const role = await Role.findById(id);
            if (!role) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Role not defind');
            const removeRole = await Role.deleteOne({ '_id': id });
            if (removeRole.deletedCount == 0) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'The roll was not deleted');
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                success: true,
                message: 'The roll was deleted',
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