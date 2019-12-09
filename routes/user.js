const router = require('koa-router')({
  prefix: '/api/v1'
});
const UserController = require('../controllers/user');

/**
 * 用户接口
 */
//创建用户
router.post('/user/create',UserController.create);

//获取详情
router.get('/user/info',UserController.getInfoByToken)
router.post('/user/info',UserController.info)
//获取列表
router.get('/user/list',UserController.list)
//登录
router.post('/user/login',UserController.login)

module.exports = router