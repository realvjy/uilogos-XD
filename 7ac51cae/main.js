/*
* uiLogos for Adobe XD by @realvjy
* Visit https://uilogos.co/xd-plugin
* Created date: Dec 2018
*/

const scenegraph = require("scenegraph");
const fs = require("uxp").storage.localFileSystem;
const { ImageFill } = require("scenegraph");

var selectedShapes = null;

// shuffle logos/images
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

async function generateLogos(type, color) {
  const pluginFolder = await fs.getPluginFolder();
  const pluginEntries = await pluginFolder.getEntries();
  const resourceFolder = await getFolderData(pluginEntries, 'resources');
  const logosFolder = await getFolderData(resourceFolder, 'logos');
  let logoTypeFolder;
  const allLogos = [];
  // logos.forEach(logo => console.log(logo.name));
  //Final Logo folder
  if (type == 'full-logo') {
    logoTypeFolder = await getFolderData(logosFolder, 'full-logo');
  }

  if (type == 'mark') {
    logoTypeFolder = await getFolderData(logosFolder, 'mark');
  }

  // Get logos array
  let logos = await getFolderData(logoTypeFolder, color);
  for (var i = 0; i < logos.length; i++) {
    allLogos.push(logos[i]);
  }

  return allLogos;
}

// Get all logos
async function getLogos(selection, type, color) {
  if (selection.items.length > 0) {
    try {
      await generateLogos(type, color)
      .then(result => {
        if (result.length > 0) {
          return fillLogos(selection, result);
        }
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log('no any logos found');
  }
}

// Get Rectangle and oval Shapes
async function fillLogos(selection, allLogos) {
  // showDialog("#alertDialog", 'Message');
  shuffle(allLogos);
  var imageCount = allLogos.length;
  if (imageCount != 0 && imageCount >= selection.items.length) {
    for (var i = 0; i < selection.items.length; i++) {
      if (selection.items[i] instanceof scenegraph.Rectangle || selection.items[i] instanceof scenegraph.Ellipse) {
        try {
          var logoObj = await getLogo(allLogos[i]);
          fillSelectionWithLogo(selection.items[i], logoObj);
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log('please select elipse or rectangle');
      }
    }
  } else {
    console.log('too many selection');
  }
}

// Fill selected shape with image/logo
function fillSelectionWithLogo(selectedPath, image) {
  const imageFill = new ImageFill(image);
  console.log(imageFill.naturalWidth);
  console.log(imageFill.naturalHeight);
  console.log(selectedPath);
  selectedPath.fill = imageFill;
}


// Get logo for selected shape
function getLogo(selectedLogo) {
  return new Promise((resolve, reject) => {
    if (selectedLogo) {
      try {
        const logo = selectedLogo;
        resolve(logo);
      } catch (e) {
        reject('could not load logo')
      }
    } else {
      reject('had an error')
    }
  });
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


// Frame Size for image repace
function getFrameSize(selectedLayer){

    // Default dimentions
    var newX = 0;
    var newY = 0;
    var newWidth = 100;
    var newHeight = 100;



    // // Decide the output frame dimension for reference
    // if (isRectangleShape(selectedLayer) || isOvalShape(selectedLayer)) {
    //   newX = selectedLayer.frame().x();
    //   newY = selectedLayer.frame().y();
    //   newWidth = selectedLayer.frame().width();
    //   newHeight = selectedLayer.frame().height();
    // }
    //
    // // // Decide the height and width
    // var ratio = originalSize.height/originalSize.width;
    //
    //
    // var newHeight = newHeight;
    // var newWidth = newHeight/ratio;
    //
    // // Check for portrait logo
    // if(newWidth > selectedLayer.width) {
    //     newWidth = selectedLayer.height;
    //     newHeight = newWidth*ratio;
    // }
    //
    //
    // // Decide location center align with shape
    // var newX = selectedLayer.frame().x() + (selectedLayer.frame().width() - newWidth)/2;
    // var newY = selectedLayer.frame().y() + (selectedLayer.frame().height() - newHeight)/2;
    //
    // return CGRectMake(newX,newY,newWidth,newHeight);
}

module.exports = {
  commands: {
    getColorLogotype: async function (selection) {
      try {
        await getLogos(selection, 'full-logo', 'color');
      } catch (error) {
        console.log(error)
      }
    },
    getBlackLogotype: async function (selection) {
      try {
        console.log('Black logotype');
      } catch (error) {
        console.log(error)
      }
    },
    getColorLogomark: async function (selection) {
      try {
        console.log('Color Logomark');
      } catch (error) {
        console.log(error)
      }
    },
    getBlackLogomark: async function (selection) {
      try {
        console.log('Black logomark');
      } catch (error) {
        console.log(error)
      }
    }
  }
}
