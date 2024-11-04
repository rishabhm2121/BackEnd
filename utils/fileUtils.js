const fs = require('fs-extra');

exports.readData = (filePath) => {
  return fs.readJsonSync(filePath, { throws: false }) || [];
};

exports.writeData = (filePath, data) => {
  fs.writeJsonSync(filePath, data);
};
