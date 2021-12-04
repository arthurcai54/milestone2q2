/*
 * Project:
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require("unzipper");
const fs = require("fs");
const PNG = require("pngjs").PNG;
const path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  // fs.mkdir(path.join(__dirname, 'unzipped'), (err) => {
  //   if (err) {
  //       return console.error(err);
  //   } 
  //   fs.createReadStream(pathIn)
  //     .pipe(unzipper.Extract({ path: pathOut })); 
  //   console.log('Directory created successfully!'); 
  // });

  return new Promise((resolve, reject) => {
    // console.log("function 1");
    let directoryFile = "unzipped/" + pathIn;
    let unzip = fs.createReadStream(pathIn)
      .pipe(unzipper.Extract({ path: pathOut }));
    unzip.on('finish', () => {
      console.log("Extraction operation complete");
      resolve(pathOut);
    });
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  // console.log("function 2");
  return new Promise((resolve, reject) => {
    fs.readdir(dir, "utf-8", (err, data) => {
      if (err) {
        reject(new Error("File can't be read"));
      } else {
        let array = [];
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          array.push(dir + '/' + data[i]);
        }
        resolve(array);
      }
    });
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  fs.createReadStream(pathIn)
    .pipe(
      new PNG({
        filterType: 4,
      })
    )
    .on("parsed", function () {
      // all 6 ways will only change this (line 82 - 93)
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;

          // invert color
          this.data[idx] = 255 - this.data[idx];
          this.data[idx + 1] = 255 - this.data[idx + 1];
          this.data[idx + 2] = 255 - this.data[idx + 2];

          // and reduce opacity
          this.data[idx + 3] = this.data[idx + 3] >> 1;
        }
      }
      this.pack().pipe(fs.createWriteStream(pathOut));
    });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
