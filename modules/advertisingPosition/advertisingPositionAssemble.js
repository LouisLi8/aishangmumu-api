// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
const Op = Sequelize.Op

// 引入数据表模型
const adRevenueAssemble = Sequelize.import('../../schema/advertisingPosition/advertisingPositionAssemble');
adRevenueAssemble.sync({force: false}); //自动创建表

class AdRevenueAssembleModel {
    /**
     * 创建媒体模型
     * @param data
     * @returns {Promise<*>}
     */
    static async update(data){
        // 这段意思是，如果 主键id 存在，则更新以下属性，不存在则插入整个数组
        return await adRevenueAssemble.bulkCreate(data, {updateOnDuplicate: 
            [
                'time',
                'ad_access_pv',
                'ad_access_uv',
                'earnings_per_uv',
                'new_visitors_uv',
                'estimated_revenue',
                'estimated_revenue_hz',
                'estimated_revenue_hegs',
                'estimated_revenue_hcyj',
            ]
        });
    }
    static async list(id){
        return await adRevenueAssemble.findAll({
            where:{
                user_id: id
            },
            order: [["id", "DESC"]]
        });
    }
    static async del(id){
        // 这段意思是，如果 主键id 存在，则更新以下属性，不存在则插入整个数组
        return await adRevenueAssemble.destroy({
            where: {
                id
            }
        })
    }
    static async listAll(){
        return await adRevenueAssemble.findAll({
            order: [["id", "DESC"]]
        });
    }
    static async search(id){
        return await adRevenueAssemble.findAll({
            where:{
                id
            },
            order: [["id", "DESC"]]
        });
    }
}

module.exports = AdRevenueAssembleModel;