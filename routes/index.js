const router = require('koa-router')({
  prefix: '/api/v1'
});
// 上传
const uploadController = require('../controllers/upload')
// 上传
const QcodeController = require('../controllers/qcode/qcode')
// 用户
const UserController = require('../controllers/user');
const RevenueController = require('../controllers/revenue');
// 邮箱
const MailController = require('../controllers/mail');
// 财务
const FinanceController = require('../controllers/finance');
// 媒体
const MediaController = require('../controllers/media/media');
const MediaRevenueAssembleController = require('../controllers/media/mediaRevenueAssemble');
const MediaRevenueDailyController = require('../controllers/media/mediaRevenueDaily');
// 广告
const AdvertisingPositionController = require('../controllers/advertisingPosition/advertisingPosition');
const AdvertisingPositionAssembleController = require('../controllers/advertisingPosition/advertisingPositionAssemble');
const AdvertisingPositionDailyController = require('../controllers/advertisingPosition/advertisingPositionDaily');
/**
 * --------------------------------------------上传接口------------------------------------------------------
 */
router.post('/image/upload',uploadController.upload);
/**
 * --------------------------------------------邮箱接口------------------------------------------------------
 */
router.post('/mail/send',MailController.send);
/**
 * --------------------------------------------二维码接口------------------------------------------------------
 */
router.post('/qcode/update',QcodeController.update);
router.get('/qcode/info',QcodeController.info);

/**
 * --------------------------------------------用户接口------------------------------------------------------
 */
//创建用户
router.post('/user/create',UserController.create);
// 用户收益
router.post('/user/revenue/create',RevenueController.create);
router.post('/user/revenue/listAll',RevenueController.listAll);
//创建用户
router.post('/user/search',UserController.search);
// 修改密码
router.post('/user/resetPassword',UserController.resetPassword);
router.post('/user/resetPasswordWithoutLogin',UserController.resetPasswordWithoutLogin);
//获取详情
router.get('/user/info',UserController.getInfoByToken)
router.post('/user/info',UserController.info)
//获取列表
router.get('/user/list',UserController.list)
router.get('/user/subList',UserController.subUserList)
//登录
router.post('/user/login',UserController.login)
// 修改合同信息
router.post('/user/updatePercentage',UserController.updatePercentage)
router.post('/user/updateAgentInfo',UserController.updateAgentInfo)
router.post('/user/updateAgentStatus',UserController.updateAgentStatus)
/**
 * --------------------------------------------财务接口------------------------------------------------------
 */
//创建用户
router.post('/finance/create',FinanceController.create);
router.get('/finance/info',FinanceController.info);
router.post('/finance/updateFinance',FinanceController.updateFinance);
// //获取详情
// router.get('/user/info',UserController.getInfoByToken)
// router.post('/user/info',UserController.info)
// //获取列表
// router.get('/user/list',UserController.list)
// //登录
// router.post('/user/login',UserController.login)
// // 修改合同信息
// router.post('/user/updateAgentInfo',UserController.updateAgentInfo)
/**
 * -----------------------------------------媒体接口---------------------------------------------------------
 */
router.post('/media/create',MediaController.create);
router.post('/media/delById',MediaController.delById);
router.post('/media/updateStatus',MediaController.updateStatus);
router.post('/media/updateNumber',MediaController.updateNumber);
router.post('/mediaRevenueAssemble/create',MediaRevenueAssembleController.create);
router.post('/mediaRevenueAssemble/list',MediaRevenueAssembleController.list);
router.post('/mediaRevenueAssemble/listAll',MediaRevenueAssembleController.listAll);
router.post('/mediaRevenueAssemble/search',MediaRevenueAssembleController.search);

router.post('/mediaRevenueDaily/create',MediaRevenueDailyController.create);
router.post('/mediaRevenueDaily/list',MediaRevenueDailyController.list);
router.post('/mediaRevenueDaily/listAll',MediaRevenueDailyController.listAll);
router.post('/mediaRevenueDaily/search',MediaRevenueDailyController.search);
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
router.post('/adposition/updateStatus',AdvertisingPositionController.updateStatus);
router.post('/adposition/updateNumber',AdvertisingPositionController.updateNumber);
router.post('/advertisingAssemble/create',AdvertisingPositionAssembleController.create);
router.post('/advertisingAssemble/list',AdvertisingPositionAssembleController.list);
router.post('/advertisingAssemble/listAll',AdvertisingPositionAssembleController.listAll);
router.post('/advertisingAssemble/search',AdvertisingPositionAssembleController.search);

router.post('/advertisingDaily/create',AdvertisingPositionDailyController.create);
router.post('/advertisingDaily/list',AdvertisingPositionDailyController.list);
router.post('/advertisingDaily/listAll',AdvertisingPositionDailyController.listAll);
router.post('/advertisingDaily/search',AdvertisingPositionDailyController.search);
//获取列表
router.get('/adposition/list',AdvertisingPositionController.list)
router.get('/adposition/listAll',AdvertisingPositionController.listAll)
router.post('/adposition/search',AdvertisingPositionController.search)
module.exports = router
