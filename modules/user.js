// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {guid} =  require("../utils/common");
// 引入数据表模型
const User = Sequelize.import('../schema/User');
User.sync({force: false}); //自动创建表

class UserModel {
    /**
     * 创建模型
     * @param data
     * @returns {Promise<*>}
     */
    static async create(data){
        return await User.create({
            token: guid(),
            email: data.email,  //邮箱
            password: data.password,  //
            category: data.category,  //
            company_name: data.company_name,  //
            real_name: data.real_name,  //
            phone: data.phone,  //
            has_media_contact: data.has_media_contact,  //
            media_contact_phone: data.media_contact_phone,  //
            invite_code: guid()
        });
    }

    /**
     * 查询的详情
     * @param id ID
     * @returns {Promise<Model>}
     */
    static async getUserDetail({email,id}){
        const params_where = {};
        email && (params_where.email = email);
        id && (params_where.id = id);
        return await User.findOne({
            where: params_where
        })
    }
    static async getUserDetailByToken(token){
        return await User.findOne({
            where: {
                token
            }
        })
    }
    static async getUserList(data){
        // const total_size = await students.count();//表总记录数
        return await User.findAll()
    }
}

module.exports = UserModel;