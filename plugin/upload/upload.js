// const errorResult = require('./errorResult.js');
const fs = require('fs');
const uploadExcelSrv = require('./uploadExcelSrv');
const xlsx = require('xlsx');
async function uploadExcel(file){
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
module.exports = {
  uploadExcel
};