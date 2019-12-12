const router = require('koa-router')({
  prefix: '/api/v1'
});
const UploadController = require('../controllers/upload');

/**
 * 用户接口
 */
//创建用户
router.post('/file/excel/upload',UploadController.uploadExcel);

module.exports = router