const fs = jest.genMockFromModule('fs');
let doesFolderExist = false;

fs.mkdir = jest.fn((dir, callback) => callback());
fs.existsSync = () => doesFolderExist;
fs.__setFolderExistanceStatus = (status) => doesFolderExist = status;
fs.__resetTestState = () => {
  doesFolderExist = false;
  fs.mkdir.mockClear();
};

module.exports = fs;