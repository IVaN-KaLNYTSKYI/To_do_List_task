const cloudinary = require('./cloudinary-helper');
const DatauriParser = require('datauri/parser');
const path = require('path');

const parser = new DatauriParser();

module.exports = {
    fileCloud: (fileName,fileData,folderName) => {
        const filesData = parser.format(path.extname(fileName).toString(), fileData);

       return  cloudinary.uploader.upload(filesData.content, { folder: folderName })

    },

    removeFileCloud: (file) => {
        cloudinary.uploader.destroy(file);
    },
};
