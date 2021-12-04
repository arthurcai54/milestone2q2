/*
 * Project:
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

IOhandler.unzip(zipFilePath, pathUnzipped);
// let list = IOhandler.readDir(pathUnzipped).then((resolve) => console.log(resolve)).catch((err) => console.log(err));
let list = [
    'C:\\Users\\arthu\\Documents\\BCIT\\Term 3\\ACIT 2520\\Final Practice 2\\starter 4/unzipped/in.png',
    'C:\\Users\\arthu\\Documents\\BCIT\\Term 3\\ACIT 2520\\Final Practice 2\\starter 4/unzipped/in1.png',
    'C:\\Users\\arthu\\Documents\\BCIT\\Term 3\\ACIT 2520\\Final Practice 2\\starter 4/unzipped/in2.png',
    'C:\\Users\\arthu\\Documents\\BCIT\\Term 3\\ACIT 2520\\Final Practice 2\\starter 4/unzipped/__MACOSX'
  ]
// console.log('list is: ' + list);

for (let i = 0; i < list.length; i++) {
  let name = list[i].split("/")[2];
  if(name.slice(name.length - 4) == '.png') {
    IOhandler.grayScale(list[i], pathProcessed + '/' + name);
  }
}

// 'C:\\Users\\arthu\\Documents\\BCIT\\Term 3\\ACIT 2520\\Final Practice 2\\starter 4/unzipped/in.png'

// 'C:\\Users\\arthu\\Documents\\BCIT\\Term 3\\ACIT 2520\\Final Practice 2\\starter 4/grayscaled + /in.png
