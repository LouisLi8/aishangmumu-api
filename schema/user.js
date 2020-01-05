const moment = require("moment");

module.exports = function(sequelize,DataTypes){
    return sequelize.define('users',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        token:{
            type: DataTypes.STRING,
            primaryKey: true,
            field:'token'
        },
        // 邮箱
        email:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            field: 'email'
        },
        // 密码
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            field:'password'
        },
        // 分类
        category:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'category'
        },
        // 分类
        company_name:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'company_name'
        },
        // 分类
        real_name:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'real_name'
        },
        // 分类
        phone:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'phone'
        },
        // 分类
        has_media_contact:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'has_media_contact'
        },
        // 分类
        media_contact_phone:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'media_contact_phone'
        },
        // 分类
        invite_code:{
            type: DataTypes.STRING,
            allowNull: true
        },
        // 合同地址
        agent_adress:{
            type: DataTypes.STRING
        },
        // 合同 联系方式
        agent_tel:{
            type: DataTypes.STRING
        },
        // 合同 收件人
        agent_consignee:{
            type: DataTypes.STRING
        },
        // 创建时间
        createdAt:{
            type: DataTypes.DATE
        },
        // 更新时间
        updatedAt:{
            type: DataTypes.DATE
            // }
        }
    },{
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true
    });
}