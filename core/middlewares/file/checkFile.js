const { ErrorHandler, codesEnum, errorMess } = require('../../errors');
const { fileEnum } = require('../../constants');

module.exports = (req, res, next) => {
    try {
        if (req.files) {
            const files = Object.values(req.files);

            const documents = [];
            const videos = [];
            const photos = [];
            for (let i = 0; i < files.length; i++) {
                const { size, mimetype } = files[i];

                if (fileEnum.PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (size > fileEnum.PHOTO_MAX_SIZE) {
                        throw new ErrorHandler(codesEnum.CONFLICT,
                            errorMess.FILE_SIZE_ERROR.message,
                            errorMess.FILE_SIZE_ERROR.code);
                    }

                    photos.push(files[i]);
                } else if (fileEnum.VIDEOS_MIMETYPES.includes(mimetype)) {
                    if (size > fileEnum.VIDEO_MAX_SIZE) {
                        throw new ErrorHandler(codesEnum.CONFLICT,
                            errorMess.FILE_SIZE_ERROR.message,
                            errorMess.FILE_SIZE_ERROR.code);
                    }

                    videos.push(files[i]);
                } else if (fileEnum.DOCS_MIMETYPES.includes(mimetype)) {
                    if (size > fileEnum.FILE_MAX_SIZE) {
                        throw new ErrorHandler(codesEnum.CONFLICT,
                            errorMess.FILE_SIZE_ERROR.message,
                            errorMess.FILE_SIZE_ERROR.code);
                    }

                    documents.push(files[i]);
                } else {
                    throw new ErrorHandler(codesEnum.CONFLICT,
                        errorMess.WRONG_FILE_FORMAT.message,
                        errorMess.WRONG_FILE_FORMAT.code);
                }
            }

            req.documents = documents;
            req.videos = videos;
            req.photos = photos;
        }

        next();
    } catch (e) {
        next(e);
    }
};
