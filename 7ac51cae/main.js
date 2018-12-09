const cmn = require("./common.js");
const scenegraph = require("scenegraph");

var txt = null;
var shapes = null;

// Call color logomark
function getColorLogomark(selection) {
  cmn.logomark(selection, 'color');
  // cmn.getLogos(selection, 'logo', 'colormark');
}

// Call black logotype
function getBlackLogomark(selection) {
  cmn.logomark(selection, 'black');
}

// Call color logotype
function getColorLogotype(selection) {
  cmn.logotype(selection, 'color');
}
// Call Black logotype
function getBlackLogotype(selection) {
  cmn.logotype(selection, 'black');
}

module.exports = {
  commands: {
    getColorLogomark : getColorLogomark,
    getBlackLogomark : getBlackLogomark,
    getColorLogotype : getColorLogotype,
    getBlackLogotype : getBlackLogotype
  }
};
