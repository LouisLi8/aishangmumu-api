const router = require('koa-router')({
  prefix: '/api/v1'
});
const ArtileController = require('../controllers/user');

// const router = new Router({
//   prefix: '/api/v1'
// });

/**
 * 文章接口
 */
//创建文章
router.post('/user/create',ArtileController.create);

//获取文章详情
router.get('/user/:id',ArtileController.detail)

module.exports = router