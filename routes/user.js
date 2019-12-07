const router = require('koa-router')({
  prefix: '/api/v1'
});
const UserController = require('../controllers/user');

/**
 * 用户接口
 */
//创建用户
router.post('/user/create',UserController.create);

//获取用户详情
router.get('/user/:id',UserController.detail)
//登录
router.post('/user/login',UserController.login)

module.exports = router