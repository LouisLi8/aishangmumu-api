const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('advertising_position',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        // 绑定的媒体
        media_id:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        // 推啊编号
        number:{
            type: DataTypes.INTEGER
        },
        // 绑定的媒体名称
        media_name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        // 广告位名称
        name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        // 规格
        specifications:{
            type: DataTypes.STRING,
            allowNull: true
        },
        // 广告位投放类型
        delivery_type:{
            type: DataTypes.STRING,
            allowNull: true
        },
        // 开启状态
        status:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        // 开启状态
        links:{
            type: DataTypes.STRING,
            allowNull: true
        },
        // 开启状态
        links_photo:{
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