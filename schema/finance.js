const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('finance',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        // 财务对象
        object:{
            type: DataTypes.STRING
        },
        // 收款公司
        collection_company:{
            type: DataTypes.STRING
        },
        // 联系地址
        contact_address:{
            type: DataTypes.STRING
        },
        // 营业执照号
        business_license_no:{
            type: DataTypes.STRING
        },
        // 营业执照
        business_license:{
            type: DataTypes.STRING
        },

        // 开户公司
        account_company:{
            type: DataTypes.STRING
        },
        // 开户银行
        bank_of_deposit:{
            type: DataTypes.STRING
        },
        // 所在地
        location:{
            type: DataTypes.STRING
        },
        // 支行名称
        bank_branch:{
            type: DataTypes.STRING
        },
        // 银行账户
        bank_account:{
            type: DataTypes.STRING
        },
        // 开户许可证
        licence:{
            type: DataTypes.STRING
        },
        // 备注信息
        remark:{
            type: DataTypes.STRING
        },
        // 审核状态
        status:{
            type: DataTypes.INTEGER
        },
        // 审核状态
        status_name:{
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