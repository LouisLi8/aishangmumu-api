// 引入mysql的配置文件
const db = require('../../config/db');
const {guid} =  require("../../utils/common");
// 引入sequelize对象
const Sequelize = db.sequelize;
const Op = Sequelize.Op

// 引入数据表模型
const AdvertisingPosition = Sequelize.import('../../schema/advertisingPosition/advertisingPosition');
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
        // return await AdvertisingPosition.create({
        //     media_id: data.media_id,
        //     media_name: data.media_name,
        //     name: data.name,
        //     specifications: data.specifications,
        //     delivery_type: data.delivery_type,
        //     status: 0, // 关闭
        // });
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
            where: params_where
        });
    }
    static async getMediaListAll(){
        return await AdvertisingPosition.findAll();
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
    static async getMediaList(id){
        return await AdvertisingPosition.findAll({
            where: {
                id
            }
        });
    }
}

module.exports = AdvertisingModel;