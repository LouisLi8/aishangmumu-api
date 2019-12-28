// 引入mysql的配置文件
const db = require('../../config/db');
const {guid} =  require("../../utils/common");
// 引入sequelize对象
const Sequelize = db.sequelize;
const Op = Sequelize.Op

// 引入数据表模型
const Media = Sequelize.import('../../schema/media/media');
Media.sync({force: false}); //自动创建表

class MediaModel {
    /**
     * 创建媒体模型
     * @param data
     * @returns {Promise<*>}
     */
    static async create(data){
        data.status = data.status ? data.status : 0;
        data.status_name = data.status_name ? data.status_name : '待验证';
        return await Media.upsert(data)
    }
    static async updateStatus(data){
        return await Media.update({
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
        return await Media.findOne({
            where: params_where
        });
    }
    static async getMediaListAll(){
        return await Media.findAll({
            order: [['id', 'DESC']]
        });
    }
    static async getMediaListAllByNameOrId(id,media_name){
        const params_where = {};
        media_name && (params_where.media_name = media_name);
        id && (params_where.id = id);
        return await Media.findAll({
            where: params_where,
            order: [['id', 'DESC']]
        });
    }
    static async getMediaList(user_id){
        return await Media.findAll({
            where: {
                user_id
            },
            order: [['id', 'DESC']]
        });
    }
}

module.exports = MediaModel;