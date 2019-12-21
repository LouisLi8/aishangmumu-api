const { OK } = require('../utils/package');
const fs = require('fs');
const path = require('path');
const uploadUrl = "http://localhost:3000";
class uploadController {
  static async upload(ctx) {
    const file = ctx.request.files.file;
    let headers = ctx.request.headers;
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../public/upload/') + `${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    OK(ctx, 200, 'OK', {url: `${uploadUrl}/public/upload/${file.name}`});
  }
}
module.exports = uploadController;