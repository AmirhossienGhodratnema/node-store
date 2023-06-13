const { StatusCodes } = require("http-status-codes");
const { checkMongoId, createError, deleteInvalidPropertyInObject } = require("../../../../../functions/golobal");
const { Course } = require("../../../../models/course");
const Controller = require("../../../controller");

const { courseFindById } = require("./courseController");
const { chapter } = require("../../../../validation/admin/courseValidation");

module.exports = new class ChapterController extends Controller {

    async createChapter(req, res, next) {
        try {
            let { id, title, description, episodes } = req.body;    // Get data from body.
            title = title.trim()    // Trim the excess title spaces.
            await checkMongoId(id);    // Check mongoId.
            const course = await courseFindById(id);
            let chaptersList = []    // Black list chapter title list.
            let chapterUpdate;
            chapterUpdate = await title.replace(' ', '#');    // Replace ' ' with '#' for check unieq title. 
            course.chapters.map(chapter => {    // Push title in chaptersList.
                chaptersList.push(chapter.title)
            });
            if (chaptersList.includes(chapterUpdate)) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'There is a season or this name');    // Error having the same title.
            let chapters = { title: chapterUpdate, description, episodes: episodes || [] };    // Main chapters
            const updateCourse = await Course.updateOne({ _id: course.id }, { $push: { chapters } });    // Update course to add chapter.
            if (updateCourse.modifiedCount == 0) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Chapter was not added');    // Error not updating the course.
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                message: 'Chapter was created',
            });
        } catch (error) {
            next(error);
        };
    };


    async chaptersList(req, res, next) {
        try {
            const { id } = req.params;  // Get data from params.
            await checkMongoId(id);    // Check mongoId.
            const chapters = await this.getChapters(id);    // Get list chapters and title from course.
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                chapters
            })
        } catch (error) {
            next(error);
        };
    };

    async remove(req, res, next) {
        try {
            const { id } = req.params;    // Get data from param.
            const chapter = await this.getOneChapter(id);    // Gettin one chapters with id.
            const removeResultChapter = await Course.updateOne({ 'chapters._id': id }, { $pull: { chapters: { _id: id } } });    // Remove chapter with pull.
            if (removeResultChapter.modifiedCount == 0) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'The chapter was not deleted');    // Error The chapter was not deleted.
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                message: 'Remove chapter',
            });
        } catch (error) {
            next(error);
        };
    };

    async updateChapter(req, res, next) {
        try {
            const { id } = req.params;    // Get data from params.
            const data = req.body;    // Get data from body for update chapter.
            const chapter = await this.getOneChapter(id);    // Get chapter for existance.
            if (!chapter) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'There is no such chapter');    // Error no such chapter.
            const mainFields = ['title', 'description', 'episodes'];
            deleteInvalidPropertyInObject(data, ['_id'], mainFields);    // Check chapter and remove some fiels.
            // return res.json(chapter.chapters[0].episodes)
            const updateResult = await Course.updateOne({ 'chapters._id': id }, { $set: { 'chapters.$': {
                title: data.title,
                description: data.description,
                episodes: chapter.chapters[0].episodes,
            } } });    // Chapter update opration.
            if (updateResult.modifiedCount == 0) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'The chpater was not updated');    // Error chapter not updated.
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                message: 'Chapter updated',
                data
            })
        } catch (error) {
            next(error);
        };
    };

    /* ---------- Options ---------- */

    async getChapters(id) {
        const chapters = await Course.findOne({ _id: id }, { chapters: 1, title: 1 });    // Getting chapters from the course.
        chapters.chapters.map(chapter => chapter.title = chapter.title.replace('#', ' '))    // title replace '#' with ' '
        if (!chapters) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'There is no such course');    // Error There is no such course.
        return chapters;
    };


    async getOneChapter(id) {
        const chapter = await Course.findOne({ 'chapters._id': id }, { 'chapters.$': 1 });
        if (!chapter) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'No such chapter was found');
        return chapter;
    }
};