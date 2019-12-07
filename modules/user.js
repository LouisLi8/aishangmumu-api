// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const User = Sequelize.import('../schema/User');
User.sync({force: false}); //自动创建表

class UserModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createUser(data){
        return await Article.create({
            email: data.email,  //邮箱
            password: data.password,  //密码
            category: data.category, //用户分类
            componany_name: data.componany_name, //用户分类
            real_name: data.real_name, //用户分类
            phone: data.phone, //用户手机号
            has_media_contact: data.media_contact, //是否有媒介联系人
            media_contact_phone: data.media_contact_phone, //媒介联系人
        });
    }

    /**
     * 查询文章的详情
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async getUserDetail(id){
        return await Article.findOne({
            where:{
                id
            }
        });
    }
}

module.exports = UserModel;