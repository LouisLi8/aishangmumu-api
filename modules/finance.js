// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
// 引入数据表模型
const Finance = Sequelize.import('../schema/finance');
Finance.sync({force: false}); //自动创建表

class FinanceModel {
    /**
     * 创建模型
     * @param data
     * @returns {Promise<*>}
     */
    static async create(data){
        return await Finance.upsert(data);
    }

    /**
     * 查询的详情
     * @param id ID
     * @returns {Promise<Model>}
     */
    static async getFinanceDetail(user_id){
        return await Finance.findOne({
            where: {
                user_id
            }
        }).catch(err => {
            console.debug(err)
        })
    }
  
    static async getFinanceList(data){
        // const total_size = await students.count();//表总记录数
        return await Finance.findAll()
    }
    static async updateFinance(data){
        return await Finance.update({
            status: data.status,
            status_name: data.status_name
        },{
            where: {
                id: data.id
            }
        })
    }
}

module.exports = FinanceModel;