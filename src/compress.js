const images = require("images");
const fs = require("fs");

function compress(dir) {
  fs.readdir(dir, function (err, files) {
    if (err) {
      console.log(`error:\n${err}`);
      return;
    }
    files.forEach((file) => {
      let filePath = `${dir}/${file}`;
      fs.stat(filePath, (err, stat) => {
        if (err) {
          console.log(err);
          return;
        }
        if (stat.isDirectory()) {
          compress(filePath);
        } else {
          let output = `./src/output/${file}`;
          images(filePath).save(output, {
            quality: 50
          });
          console.log(output);
        }
      });
    });
  });
}
compress("./src/input");