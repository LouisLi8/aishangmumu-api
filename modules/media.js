// 引入mysql的配置文件
const db = require('../config/db');
const {guid} =  require("../utils/common");
// 引入sequelize对象
const Sequelize = db.sequelize;
const Op = Sequelize.Op

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
            user_id: data.user_id,
            media_name: data.media_name,
            preference_industry_id: data.preference_industry_id,
            support_download_ads: data.support_download_ads,
            website_domain_name: data.website_domain_name,
            media_keyword: data.media_keyword,
            name_of_public_address: data.name_of_public_address,
            type_of_public_address: data.type_of_public_address,
            main_body_of_public_adress: data.main_body_of_public_adress,
            media_type: data.media_type,
            description: data.description,
            status: 0, // 待验证
            status_name: '待验证' // 待验证
        });
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
        return await Media.findOne({
            where: params_where
        });
    }
    static async getMediaListAll(){
        return await Media.findAll();
    }
    static async getMediaListAllByNameOrId(id,media_name){
        if(id && media_name) {
            return await Sequelize.query(`
            SELECT * FROM media where id = ${id} and media_name LIKE '%${media_name}%'
            `);
        }
        else if(id && !media_name) {
            return await Media.findAll({
                where: {
                    id
                }
            });
        }
        else if(!id && media_name) {
            return await Media.findAll({
                where: {
                    media_name: {
                        [Op.substring]: media_name 
                    }
                    // media_name: `%${media_name}%`
                }
            });
        }
    }
    static async getMediaList(user_id){
        return await Media.findAll({
            where: {
                user_id
            }
        });
    }
}

module.exports = MediaModel;