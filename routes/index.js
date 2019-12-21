const router = require('koa-router')({
  prefix: '/api/v1'
});
// 上传
const uploadController = require('../controllers/upload')
// 用户
const UserController = require('../controllers/user');
// 媒体
const MediaController = require('../controllers/media/media');
const MediaRevenueAssembleController = require('../controllers/media/mediaRevenueAssemble');
// 广告
const AdvertisingPositionController = require('../controllers/advertisingPosition/advertisingPosition');
const AdvertisingPositionAssembleController = require('../controllers/advertisingPosition/advertisingPositionAssemble');
/**
 * --------------------------------------------上传接口------------------------------------------------------
 */
router.post('/image/upload',uploadController.upload);

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
router.post('/mediaRevenueAssemble/list',MediaRevenueAssembleController.list);
//获取详情
router.post('/media/info',MediaController.detail)
//获取列表
router.get('/media/list',MediaController.list)
router.get('/media/listAll',MediaController.listAll)
router.post('/media/search',MediaController.search)
/**
 * -----------------------------------广告接口-----------------------------------------------------------------
 */
router.post('/adposition/create',AdvertisingPositionController.create);
router.post('/advertisingAssemble/create',AdvertisingPositionAssembleController.create);
router.post('/advertisingAssemble/list',AdvertisingPositionAssembleController.list);
//获取列表
router.get('/adposition/list',AdvertisingPositionController.list)
router.get('/adposition/listAll',AdvertisingPositionController.listAll)
router.post('/adposition/search',AdvertisingPositionController.search)
module.exports = router
