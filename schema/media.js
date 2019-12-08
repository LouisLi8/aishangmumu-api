const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('media',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        // 名称
        media_name:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'media_name'
        },
        // 密码
        preference_industry_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'preference_industry_id'
        },
        // 分类
        support_download_ads:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'support_download_ads'
        },
        // 分类
        website_domain_name:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'website_domain_name'
        },
        // 分类
        media_keyword:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'media_keyword'
        },
        // 分类
        description:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'description'
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