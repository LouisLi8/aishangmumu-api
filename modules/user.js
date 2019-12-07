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
    static async userLogin(data){
        return await User.create({
            email: data.email,  //邮箱
            password: data.password,  //密码
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