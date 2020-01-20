// 引入mysql的配置文件
const db = require('../../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
const Op = require('sequelize').Op

// 引入数据表模型
const Media = Sequelize.import('../../schema/media/media');
const mediaRevenueAssemble = Sequelize.import('../../schema/media/mediaRevenueAssemble');
//建立表关联关系  当前表（User）的字段： user_name  关联表（userRoom）的字段user_id
Media.belongsTo(mediaRevenueAssemble, { foreignKey: 'number', as: 'revenue'});

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
    static async updateNumber(data){
        return await Media.update({
            number: data.number
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
            where: params_where,
            nclude: [{
                model: mediaRevenueAssemble,
                as: 'revenue',
            }],
            order: [['id', 'DESC']]
        });
    }
    static async getMediaListAll(){
        return await Media.findAll({
            include: [{
                model: mediaRevenueAssemble,
                as: 'revenue',
            }],
            order: [['id', 'DESC']]
        });
    }
    static async getMediaListAllByNameOrId(id,media_name){
        const params_where = {};
        media_name && (params_where.media_name = media_name);
        id && (params_where.id = id);
        return await Media.findAll({
            where: params_where,
            include: [{
                model: mediaRevenueAssemble,
                as: 'revenue',
            }],
            order: [['id', 'DESC']]
        });
    }
    static async getMediaList(user_id){
        // return Sequelize.query(
        //     `SELECT m.*,r.* FROM media m left join media_revenue_assemble r ON m.number = r.id WHERE m.user_id = ${user_id}`
        //     )
        return await Media.findAll({
            where: {
                [Op.or]: [{user_id: user_id}, {pid: user_id}]
            },
            include: [{
                model: mediaRevenueAssemble,
                as: 'revenue',
            }],
            order: [['id', 'DESC']]
        });
    }
}

module.exports = MediaModel;