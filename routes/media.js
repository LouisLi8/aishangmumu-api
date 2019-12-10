const router = require('koa-router')({
  prefix: '/api/v1'
});
const MediaController = require('../controllers/media');

/**
 * 接口
 */
//创建
router.post('/media/create',MediaController.create);

//获取详情
router.post('/media/info',MediaController.detail)
//获取列表
router.get('/media/list',MediaController.list)
router.get('/media/listAll',MediaController.listAll)
router.post('/media/search',MediaController.search)


module.exports = router