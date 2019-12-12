// const errorResult = require('./errorResult.js');
const {OK} = require('../utils/package');
const fs = require('fs');
const uploadExcelSrv = require('../plugin/upload/uploadExcelSrv');
const xlsx = require('xlsx');
class uploadController { 
  static async uploadExcel(file){
        try {
          const getRes = await uploadExcelSrv.getExcelObjs(file);
          if (getRes.status) {
            if (getRes.datas.length > 0) {
              return getRes.datas;
            }
          } else {
            return false;
          }
        }
        catch(err) {
          return false;
        }
    }
}
module.exports = uploadController;