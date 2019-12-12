// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
const Op = Sequelize.Op

// 引入数据表模型
const mediaRevenueAssemble = Sequelize.import('../../schema/media/mediaRevenueAssemble');
mediaRevenueAssemble.sync({force: false}); //自动创建表

class MediaRevenueAssembleModel {
    /**
     * 创建媒体模型
     * @param data
     * @returns {Promise<*>}
     */
    static async update(data){
        // 这段意思是，如果 主键id 存在，则更新以下属性，不存在则插入整个数组
        return await mediaRevenueAssemble.bulkCreate(data, {updateOnDuplicate: 
            [
                'time',
                'ad_access_pv',
                'ad_access_uv',
                'earnings_per_uv',
                'new_visitors_uv',
                'estimated_revenue'
            ]
        });
    }
}

module.exports = MediaRevenueAssembleModel;