var scenegraph = require('scenegraph');
const fs = require("uxp").storage.localFileSystem;

// Get Rectangel and oval Shapes
function getShapes(selection) {
  return selection.items.filter(item => (item instanceof scenegraph.Rectangle || item instanceof scenegraph.Ellipse));
}

// get Logos
async function getLogos(selection, type, color) {
  var pluginFolder = await fs.getPluginFolder(),
  pluginEntries = await pluginFolder.getEntries();
  var resourceFolder = await getFolderData(pluginEntries, 'resources'),
      logos = await getFolderData(resourceFolder, 'logos'),
      allLogos;

  if (type == 'full-logo') {
    var full_logos = await getFolderData(logos, 'full-logo');

    allLogos = await getFolderData(full_logos, color)
  }

  if (type == 'mark') {
    var marks = await getFolderData(logos, 'mark');
    allLogos = await getFolderData(marks, color);
  }
  
  allLogos.forEach(entry => console.log(entry.name));

  for (var i = 0; i < selection.items.length; i++) {
      console.log(i);
  }
}


// Return Folder and Files
async function getFolderData(entries, folderName) {
  var folder = entries.filter(entry => entry.isFolder && entry.name == folderName);
  if (folder.length == 0) {
    console.log('The folder ' + folderName + ' doesn\'t exist');
    return undefined;
  } else {
    var files = await folder[0].getEntries();
    return files;
  }
}


//get only image file .jpg and .png
function getImages(entries) {
  var regex = /.*\.jpg|.*\.png/;
  return entries.filter(entry => regex.test(entry.name));
}


// Replace shape with image
function replaceWithImages(images, context) {
  // for (var i = 0; i < selection.items.length; i++) {
  //
  // }
}

// Get Logo Image URL stack
async function placeLogoImage(selection) {

}


// Color Logomark
async function logomark(selection, color) {
  console.log('mark'+color);

  await getLogos(selection, 'mark' , color);
}

// Black Logotype
async function logotype(selection, color) {
  await getLogos(selection, 'full-logo' , color);
}

module.exports = {
  getLogos,
  placeLogoImage,
  getImages,
  getFolderData,
  logomark,
  logotype
}
