// 引入mysql的配置文件
const db = require('../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
// 引入数据表模型
const Revenue = Sequelize.import('../schema/revenue/revenue');
Revenue.sync({force: false}); //自动创建表

class UserModel {
    /**
     * 创建模型
     * @param data
     * @returns {Promise<*>}
     */
    static async create(data){
        return await Revenue.upsert(data);
    }
    static async update(data){
        return await Revenue.upsert(data);
    }
    static async listALl(){
        return await Revenue.findAll();
    }

}

module.exports = UserModel;