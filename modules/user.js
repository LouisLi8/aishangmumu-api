// 引入mysql的配置文件
const db = require('../config/db');
// 引入sequelize对象
const sequelize_i = require('sequelize');
const Sequelize = db.sequelize;
const Op = sequelize_i.Op;

const {guid} =  require("../utils/common");
// 引入数据表模型
const User = Sequelize.import('../schema/user');
const Finance = Sequelize.import('../schema/finance');
const Revenue = Sequelize.import('../schema/revenue/revenue');

User.hasOne(Finance, { foreignKey: 'user_id'});
User.hasOne(Revenue);
User.hasMany(User, {foreignKey: 'pid', through: null , as: 'sub_users'});
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
            pid: data.pid || 0
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
            where: params_where,
            include: [{
                model: Revenue,
                as: 'revenue',
            }]
        })
    }
    static async getUserDetailByToken(token){
        return await User.findOne({
            where: {
                token
            },
            include: [{
                model: Revenue,
                as: 'revenue',
            }]
        })
    }
    static async getUserList(){
        // const total_size = await students.count();//表总记录数
        return await User.findAll({
            include: [
                {
                    model: Revenue,
                    as: 'revenue',
                },
                {
                    model: Finance,
                    as: 'finance',
                },
            ]
        })
    }
    static async subUserList(id){
        // const total_size = await students.count();//表总记录数
        return await User.findOne({
            where: {
                id
            },
            include: [
                {
                    model: User,
                    as: 'sub_users'
                },
                {
                    model: Revenue,
                    as: 'revenue'
                },
                {
                    model: Finance,
                    as: 'finance'
                },
            ]
        })
    }
    static async getUserListByEmail(email){
        let emailFilter = email ? { email: { [Op.like]: "%"+email+"%" } } : {}
        // const total_size = await students.count();//表总记录数
        return await User.findAll({
            where: emailFilter
        })
    }
    static async updateAgentInfo(data){
        return await User.update({
            agent_adress: data.agent_adress,
            agent_tel: data.agent_tel,
            agent_consignee: data.agent_consignee,
        },{
            where: {
                id: data.id
            }
        })
    }
    static async updateAgentStatus(data){
        return await User.update({
            agent_is_sign: data.agent_is_sign
        },{
            where: {
                id: data.id
            }
        })
    }
    static async updatePercentage(data){
        return await User.update({
            percentage: data.percentage
        },{
            where: {
                id: data.id
            }
        })
    }
    static async updatePassword(data){
        return await User.update({
            password: data.password
        },{
            where: {
                id: data.id
            }
        })
    }
}

module.exports = UserModel;