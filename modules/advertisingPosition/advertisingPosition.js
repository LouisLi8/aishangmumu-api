// 引入mysql的配置文件
const db = require('../../config/db');
const {guid} =  require("../../utils/common");
// 引入sequelize对象
const Sequelize = db.sequelize;
const Op = require('sequelize').Op;

// 引入数据表模型
const AdvertisingPosition = Sequelize.import('../../schema/advertisingPosition/advertisingPosition');
const adRevenueAssemble = Sequelize.import('../../schema/advertisingPosition/advertisingPositionAssemble');
//建立表关联关系  当前表（User）的字段： user_name  关联表（userRoom）的字段user_id
AdvertisingPosition.belongsTo(adRevenueAssemble, { foreignKey: 'number', as: 'revenue'});
AdvertisingPosition.sync({force: false}); //自动创建表

class AdvertisingModel {
    /**
     * 创建媒体模型
     * @param data
     * @returns {Promise<*>}
     */
    static async create(data){
        data.status = 0;
        data.status_name = '待验证';
        return await AdvertisingPosition.upsert(data)
    }
    static async updateStatus(data){
        return await AdvertisingPosition.update({
            status: data.status,
            status_name: data.status_name,
            rejection_reason: data.rejection_reason
        },{
            where: {
                id: data.id
            }
        })
    }

    /**
     * 查询文章的详情
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async getMediaDetail({name,id}){
        const params_where = {};
        name && (params_where.media_name = name);
        id && (params_where.id = id);
        return await AdvertisingPosition.findOne({
            where: params_where,
            include: [{
                model: adRevenueAssemble,
                as: 'revenue',
            }],
            order: [['id', 'DESC']]
        });
    }
    static async getMediaListAll(){
        return await AdvertisingPosition.findAll({
            include: [{
                model: adRevenueAssemble,
                as: 'revenue',
            }],
            order: [['id', 'DESC']]
        });
    }
    static async getMediaListAllByNameOrId(id,name){
        const params_where = {};
        name && (params_where.name = name);
        id && (params_where.id = id);
        return await AdvertisingPosition.findAll({
            where: params_where,
            include: [{
                model: adRevenueAssemble,
                as: 'revenue',
            }],
            order: [['id', 'DESC']]
        });
    }
    static async getList(user_id){
        return await AdvertisingPosition.findAll({
            where: {
                [Op.or]: [{user_id: user_id}, {pid: user_id}]
            },
            include: [{
                model: adRevenueAssemble,
                as: 'revenue',
            }],
        });
    }
    static async del(id){
        // 这段意思是，如果 主键id 存在，则更新以下属性，不存在则插入整个数组
        return await AdvertisingPosition.destroy({
            where: {
                id
            }
        })
    }
    static async updateNumber(data){
        return await AdvertisingPosition.update({
            number: data.number
        },{
            where: {
                id: data.id
            }
        })
    }
}

module.exports = AdvertisingModel;