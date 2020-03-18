// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
const Op = Sequelize.Op

// 引入数据表模型
const mediaRevenueDaily = Sequelize.import('../../schema/media/mediaRevenueDaily');
mediaRevenueDaily.sync({force: false}); //自动创建表

class mediaRevenueDailyModel {
    /**
     * 创建媒体模型
     * @param data
     * @returns {Promise<*>}
     */
    static async update(data){
        // 这段意思是，如果 主键id 存在，则更新以下属性，不存在则插入整个数组
        return await mediaRevenueDaily.bulkCreate(data, {updateOnDuplicate: 
            [
                'time',
                'media_id',
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
    static async list(id){
        // 这段意思是，如果 主键id 存在，则更新以下属性，不存在则插入整个数组
        return await mediaRevenueDaily.findAll({
            where:{
                media_id: id
            },
            order: [["time", "DESC"]]
        });
    }
    static async listAll(){
        // 这段意思是，如果 主键id 存在，则更新以下属性，不存在则插入整个数组
        return await mediaRevenueDaily.findAll({
            order: [["id", "DESC"]]
        });
    }
    static async search(id){
        // 这段意思是，如果 主键id 存在，则更新以下属性，不存在则插入整个数组
        return await mediaRevenueDaily.findAll({
            where:{
                id
            },
            order: [["id", "DESC"]]
        });
    }
}

module.exports = mediaRevenueDailyModel;