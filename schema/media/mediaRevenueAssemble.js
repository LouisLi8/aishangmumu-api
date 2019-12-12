const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('media_revenue_assemble',{
        // id:{
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     allowNull: true,
        //     autoIncrement: true
        // },
        // 绑定的用户
        // 推啊编号
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        user_id:{
            type: DataTypes.INTEGER
        },
        // 订单收益日期
        time:{
            type: DataTypes.STRING
        },
        // 名称
        media_name:{
            type: DataTypes.STRING
        },
        // 系统平台
        media_type:{
            type: DataTypes.STRING
        },
        // 广告位访问 PV
        ad_access_pv:{
            type: DataTypes.STRING
        },
        // 广告位访问 UV
        ad_access_uv:{
            type: DataTypes.STRING
        },
        // 每uv收益
        earnings_per_uv:{
            type: DataTypes.STRING
        },
        // 新客访问uv收益
        new_visitors_uv:{
            type: DataTypes.STRING
        },
        // 预计收益
        estimated_revenue:{
            type: DataTypes.STRING
        },
        // 杭州预计收益
        estimated_revenue_hz:{
            type: DataTypes.STRING
        },
        // 霍尔果斯预计收益
        estimated_revenue_hegs:{
            type: DataTypes.STRING
        },
        // 霍城兑捷预计收益
        estimated_revenue_hcyj:{
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