
const { StatusCodes } = require("http-status-codes");
const Controller = require("../../../controller");
const { ValidationData, createError, deleteInvalidPropertyInObject } = require("../../../../../functions/golobal");
const { Permission } = require("../../../../models/permission");




module.exports = new class PermissionController extends Controller {
    async index(req, res, next) {
        try {
            const permission = await Permission.find({});
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                permission
            })
        } catch (error) {
            next(error);
        };
    };


    async create(req, res, next) {
        try {
            const { title, description } = req.body;
            await ValidationData(req);
            await deleteInvalidPropertyInObject(req.body, ['_id'], ['title', 'description']);
            const resultPermission = await this.checkPermissionDublicate(req.body.title);
      
            const create = await Permission.create({ title: resultPermission, description });
            console.log('Create', create);
            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                success: true,
                message: 'Permission created',
                resultPermission
            });
        } catch (error) {
            next(error);
        };
    };



    async checkPermissionDublicate(title) {
        let resutlTitle = title.replace(' ', '#');
        const permission = await Permission.findOne({ title: resutlTitle });
        console.log(resutlTitle)
        if (permission) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Permission dublicated');
        return resutlTitle;
    }
};