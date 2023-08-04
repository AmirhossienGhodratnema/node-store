const { StatusCodes } = require("http-status-codes");
const Controller = require("../../controller");
const path = require('path');
const { unlinkPhoto, createError, checkMongoId } = require("../../../../functions/golobal");
const { Conversation } = require("../../../models/conversation");
const { Room } = require("../../../models/room");


module.exports = new class RoomController extends Controller {
    async create(req, res, next) {
        try {
            const { nameSpace, name, description, fileUploadPath, filename } = req.body;
            await this.checkNameSpace(nameSpace);
            await this.checkRoom(name)
            const image = path.join(fileUploadPath, filename).replace(/\\/g, '/');
            await Room.create({ nameSpace, name, description, image })
            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                success: true,
                message: 'Room created',
            });
        } catch (error) {
            if (req?.body?.fileUploadPath && req?.body?.filename) {
                const { fileUploadPath, filename } = req.body;    // Get fiels for unlinkPhoto.
                await unlinkPhoto(fileUploadPath, filename);     // Delete image.
            };
            next(error);
        };
    };

    async getAll(req, res, next) {
        try {
            const data = await Room.find({});
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                data
            })
        } catch (error) {
            next(error);
        };
    };

    async checkNameSpace(nameSpace) {
        await checkMongoId(nameSpace);
        const result = await Conversation.findOne({ _id: nameSpace });
        if (!result) await createError(StatusCodes.NOT_FOUND, 'Conversation is not defind');
    }

    async checkRoom(name) {
        const result = await Room.findOne({ name });
        if (result) await createError(StatusCodes.BAD_REQUEST, 'The room name is dublicate');
    }
};