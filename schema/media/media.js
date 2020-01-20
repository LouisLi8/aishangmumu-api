const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('media',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: 1100
        },
        // 绑定的用户
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'user_id'
        },
        // 绑定的用户
        pid:{
            type: DataTypes.INTEGER,
            field: 'pid'
        },
        // 推啊编号
        number:{
            type: DataTypes.INTEGER
        },
        // 名称
        media_name:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'media_name'
        },
        // 密码
        preference_industry_id:{
            type: DataTypes.STRING,
            allowNull: false,
            field:'preference_industry_id'
        },
        // 
        support_download_ads:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'support_download_ads'
        },
        // 
        name_of_public_address:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'name_of_public_address'
        },
        // 
        type_of_public_address:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'type_of_public_address'
        },
        // 
        main_body_of_public_adress:{
            type: DataTypes.STRING
        },
        // 
        website_domain_name:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'website_domain_name'
        },
        // 
        media_keyword:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'media_keyword'
        },
        // 媒体状态
        status:{
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'status'
        },
        // 
        status_name:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'status_name'
        },
        // 
        appKey:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'appKey'
        },
        // 
        appSecret:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'appSecret'
        },
        // 
        media_type:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'media_type'
        },
        // 媒体描述
        description:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'description'
        },
        // 拒绝理由
        rejection_reason:{
            type: DataTypes.STRING,
            allowNull: true
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