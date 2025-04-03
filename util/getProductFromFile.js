const fs = require("fs");

exports.getProductsFromFile = (path, cb) => {
    fs.readFile(path, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};
