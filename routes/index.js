const router = require('koa-router')({
  prefix: '/api/v1'
});
// 用户
const UserController = require('../controllers/user');
// 媒体
const MediaController = require('../controllers/media/media');
const MediaRevenueAssembleController = require('../controllers/media/mediaRevenueAssemble');
// 广告
const AdvertisingPositionController = require('../controllers/advertisingPosition/advertisingPosition');
const AdvertisingPositionAssembleController = require('../controllers/advertisingPosition/advertisingPositionAssemble');
/**
 * --------------------------------------------用户接口------------------------------------------------------
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
/**
 * -----------------------------------------媒体接口---------------------------------------------------------
 */
router.post('/media/create',MediaController.create);
router.post('/mediaRevenueAssemble/create',MediaRevenueAssembleController.create);
//获取详情
router.post('/media/info',MediaController.detail)
//获取列表
router.get('/media/list',MediaController.list)
router.get('/media/listAll',MediaController.listAll)
router.post('/media/search',MediaController.search)
/**
 * -----------------------------------广告接口-----------------------------------------------------------------
 */
router.post('/advertising/create',AdvertisingPositionController.create);
router.post('/advertisingAssemble/create',AdvertisingPositionAssembleController.create);

module.exports = router
