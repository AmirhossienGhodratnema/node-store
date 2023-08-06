const { createError, ValidationData } = require("../../../../functions/golobal");
const { Conversation } = require("../../../models/conversation");
const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");




module.exports = new class NamespaceController extends Controller {
    async create(req, res, next) {
        try {
            const { title, endpoint } = req.body;
            await ValidationData(req)
            const conversation = await Conversation.create({ title, endpoint });
            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                success: true,
                message: 'Created Namespace'
            });
        } catch (error) {
            next(error);
        };
    };

    async getAll(req, res, next) {
        try {
            const namespace = await Conversation.find({}, { rooms: 0 }).sort({createdAt : -1}).populate('room');
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                data: namespace
            });
        } catch (error) {
            next(error);
        }
    }


    // ------------------- Options -------------------
    async checkNameSpace(title) {
        const result = await Conversation.findOne({ title });
        if (result) await createError(StatusCodes.BAD_REQUEST, 'Title is dublicate');
    };

    async checkNameSpaceEndpoint(endpoint) {
        const result = await Conversation.findOne({ endpoint });
        console.log('result', result)
        if (result) await createError(StatusCodes.BAD_REQUEST, 'Endpoint is dublicate');
    };
};