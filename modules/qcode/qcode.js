// 引入mysql的配置文件
const db = require('../../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
// 引入数据表模型
const Qcode = Sequelize.import('../../schema/qcode/qcode.js');
Qcode.sync({force: false}); //自动创建表

class QcodeModel {
    /**
     * 创建模型
     * @param data
     * @returns {Promise<*>}
     */
    static async update(data){
        return await Qcode.upsert(data);
    }
    static async getInfo(){
        return await Qcode.findAll();
    }
}

module.exports = QcodeModel;