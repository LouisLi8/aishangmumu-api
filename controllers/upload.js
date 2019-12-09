// const errorResult = require('./errorResult.js');
const {OK} = require('../utils/package');
const fs = require('fs');
const uploadExcelSrv = require('../plugin/upload/uploadExcelSrv');
const xlsx = require('xlsx');
class uploadController { 
  static async upload(ctx){
    const file = ctx.request.files.file;
    if(file) {
      try {
        const getRes = await uploadExcelSrv.getExcelObjs(ctx);
        if (getRes.status) {
          if (getRes.datas.length > 1) {
            OK(ctx,300,'暂时不支持多个sheet存在', getRes.datas);
          } else { //得到的是数组
            const objs = getRes.datas[0];
            OK(ctx,200,'上传数据成功', objs);
          }
        } else {
          
          OK(ctx,300,'文件解析错误', null);
        }
      }
      catch(err) {
        OK(ctx,300,'文件上传错误', null);
      }
    }
    else {
      OK(ctx,300,'文件必须传', null);
    }
}

}
module.exports = uploadController;