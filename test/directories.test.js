jest.mock('fs');

const fs = require('fs');
const directories = require('../src/utils/directories.js');

describe('createDirectory', () => {
  describe('recursive behaviour', () => {
    const originalCreateDirectory = directories.createDirectory;

    beforeEach(() => {
      directories.createDirectory = jest.fn(originalCreateDirectory);
    });

    afterEach(() => {
      directories.createDirectory = originalCreateDirectory;
    });

    it('should call itself once for one segment', () => {
      directories.createDirectory('app', ['inbound']);

      expect(directories.createDirectory).toHaveBeenCalledTimes(2);
    });

    it('should call itself once for each segment', () => {
      directories.createDirectory('app', ['inbound', 'spots']);

      expect(directories.createDirectory).toHaveBeenCalledTimes(3);
    });
  });

  it('should call mkdir if directory does not exist', () => {
    fs.__setFolderExistanceStatus(false);

    directories.createDirectory('app', ['inbound']);
    expect(fs.mkdir).toHaveBeenCalled();

    fs.__resetTestState();
  });

  it('should not call mkdir if directory exists', () => {
    fs.__setFolderExistanceStatus(true);

    directories.createDirectory('app', ['inbound']);
    expect(fs.mkdir).not.toHaveBeenCalled();

    fs.__resetTestState();
  });
});