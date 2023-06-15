


module.exports = {
    // PERMISSIONS: Object.freeze({
    //     USER: 'USER',
    //     PRODUCT: 'PRODUCT',
    //     COURSE: 'COURSE',
    //     OWNER: 'OWNER',
    //     EPISODE: 'EPISODE',
    //     BLOG: 'BLOG',
    //     CATEGORY: 'CATEGORY',
    //     CHAPTER: 'CHAPTER',
    //     ALL: 'ALL',
    // })
    PERMISSIONS: Object.freeze({

        ADMIN: ['ALL'],




        USER: ['PROFILE'],
        SUPERADMIN: ['ALL'],
        CONTENT_MANAGER: ['COURSE', 'BLOG', 'CATEGORY', 'PRODUCT'],
        TEACHER: ['COURSE', 'BLOG'],
        SUPPLIER: ['PRODUCT'],
    })
}