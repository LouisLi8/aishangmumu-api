const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('advertising_position_revenue_daily',{
        // 订单收益日期
        id:{
            type: DataTypes.STRING,
            primaryKey: false,
        },
        time:{
            primaryKey: true,
            type: DataTypes.STRING
        },
        // 绑定的媒体
        ad_id:{
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        // 绑定的用户
        user_id:{
            type: DataTypes.INTEGER
        },
        // 曝光量
        exposure:{
            type: DataTypes.STRING
        },
        // 点击量
        clicks:{
            type: DataTypes.STRING
        },
        // 点击率
        click_rate:{
            type: DataTypes.STRING
        },
        // CPC
        cpc:{
            type: DataTypes.STRING
        },
        // CPM
        cpm:{
            type: DataTypes.STRING
        },
        // IP访问量
        ip_traffic:{
            type: DataTypes.STRING
        },
        // 推啊编号
        number:{
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
        //  曝光量
        // exposure:{
        //     type: DataTypes.BOOLEAN,
        // },
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