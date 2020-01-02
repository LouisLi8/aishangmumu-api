const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('revenue',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        time: {
            type: DataTypes.DATE
        },
        revenue:{
            type: DataTypes.INTEGER,
        },
        user_id:{
            type: DataTypes.INTEGER,
        },
        last_days_revenue:{
            type: DataTypes.INTEGER
        },
        last_seven_days_revenue:{
            type: DataTypes.INTEGER
        },
        month_revenue:{
            type: DataTypes.INTEGER
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