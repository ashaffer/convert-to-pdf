var unoconv = require('unoconv');
var stream = require('stream');
var path = require('path');

module.exports = function(name, cb) {
  var ext = path.extname(name);

  // If it's already a pdf, just return the file as a Buffer
  if(ext === '.pdf') {
    cb(null, fs.readReadStream(name));
    return;
  }

  var bufStream = new stream.PassThrough();
  unoconv.convert(name, 'pdf', function(err, buf) {
    if(err) {
      bufStream.emit('error', err);
      return;
    }

    bufStream.end(buf);
  });

  return bufStream;
};