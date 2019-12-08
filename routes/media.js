const router = require('koa-router')({
  prefix: '/api/v1'
});
const MediaController = require('../controllers/media');

/**
 * 用户接口
 */
//创建用户
router.post('/media/create',MediaController.create);

//获取用户详情
router.get('/media/:id',MediaController.detail)


module.exports = router