// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;

const Sequelized = require('sequelize');
const Op = Sequelized.Op;


// 引入数据表模型
const advertisingPositionDaily = Sequelize.import('../../schema/advertisingPosition/advertisingPositionDaily');
advertisingPositionDaily.sync({force: false}); //自动创建表

class AdvertisingPositionDailyModel {
    /**
     * 创建媒体模型
     * @param data
     * @returns {Promise<*>}
     */
    static async update(data){
        // 这段意思是，如果 主键id 存在，则更新以下属性，不存在则插入整个数组
        return await advertisingPositionDaily.bulkCreate(data, {updateOnDuplicate: 
            [
                'time',
                'ad_id',
                // 'exposure',
                // 'clicks',
                // 'click_rate',
                // 'cpc',
                // 'cpm',
                // 'ip_traffic',
                // 'ad_access_pv',
                // 'ad_access_uv',
                // 'earnings_per_uv',
                // 'new_visitors_uv',
                // 'estimated_revenue',
                // 'estimated_revenue_hz',
                // 'estimated_revenue_hegs',
                // 'estimated_revenue_hcyj',
            ]
        });
    }
    static async list(id, startTime, endTime){
        // 这段意思是，如果 主键id 存在，则更新以下属性，不存在则插入整个数组
        return await advertisingPositionDaily.findAll({
            where:{
                ad_id: id,
                time: {
                    [Op.lt]: new Date(startTime) || new Date(),
                    // 365天
                    [Op.gt]: new Date(endTime) || new Date(new Date() - 365 * 24 * 60 * 60 * 1000)
                }
            },
            order: [["time", "DESC"]]
        });
    }
    static async listAll(){
        // 这段意思是，如果 主键id 存在，则更新以下属性，不存在则插入整个数组
        return await advertisingPositionDaily.findAll({
            order: [["id", "DESC"]]
        });
    }
    static async search(id){
        // 这段意思是，如果 主键id 存在，则更新以下属性，不存在则插入整个数组
        return await advertisingPositionDaily.findAll({
            where:{
                id
            },
            order: [["id", "DESC"]]
        });
    }
}

module.exports = AdvertisingPositionDailyModel;