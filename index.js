var unoconv = require('unoconv');
var path = require('path');
var fs = require('fs');

module.exports = function(fileName, opts, cb) {
  var type;
  opts = opts || {};

  type = path.extname(fileName).slice(1);

  // If it's already a pdf, just return the file as a Buffer
  if(type === 'pdf') {
    cb(null, fs.readFileSync(fileName));
    return;
  }

  unoconv.convert(fileName, 'pdf', cb);
};