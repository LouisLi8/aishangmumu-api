// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Media = Sequelize.import('../schema/media');
Media.sync({force: false}); //自动创建表

class MediaModel {
    /**
     * 创建媒体模型
     * @param data
     * @returns {Promise<*>}
     */
    static async create(data){
        return await Media.create({
            media_name: data.email,
            preference_industry_id: data.email,
            support_download_ads: data.email,
            website_domain_name: data.email,
            media_keyword: data.email,
            description: data.email
        });
    }

    /**
     * 查询文章的详情
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async getMediaDetail(id){
        return await Article.findOne({
            where:{
                id
            }
        });
    }
}

module.exports = MediaModel;