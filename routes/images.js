let fs = require('fs')
module.exports = {
  readImg(path,res) {
    fs.readFile('./upload/' + path, 'binary', (err, file) => {
      if (err) {
        res.send({ code: '500', msg: 'failure' })
      } else {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.write(file, 'binary');
        res.end()
      }
    })
  }
}