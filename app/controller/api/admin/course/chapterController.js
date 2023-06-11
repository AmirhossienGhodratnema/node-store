const { StatusCodes } = require("http-status-codes");
const { checkMongoId, createError } = require("../../../../../functions/golobal");
const { Course } = require("../../../../models/course");
const Controller = require("../../../controller");


module.exports =new class ChapterController extends Controller {

    
    async createChapter(req, res, next) {
        try {
            let { id, title, description, episodes } = req.body;    // Get data from body.
            title = title.trim()    // Trim the excess title spaces.
            await checkMongoId(id);    // Check mongoId.
            const course = await this.courseFindById(id);
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


    /* ---------- Options ---------- */

    async courseFindById(id) {
        const course = await Course.findById(id);    // Gettin course with id.
        if (!course) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'There is no course');    // Error if there is no course
        return course    // Send data.
    };
}