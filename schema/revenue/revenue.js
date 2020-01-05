module.exports = function(sequelize,DataTypes){
    return sequelize.define('revenue',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        time: {
            type: DataTypes.DATE
        },
        // 得分
        score:{
            type: DataTypes.DECIMAL,
        },
        // 累计收益
        revenue:{
            type: DataTypes.DECIMAL,
        },
        // 昨日收益
        last_days_revenue:{
            type: DataTypes.DECIMAL
        },
        // 近7日收益
        last_seven_days_revenue:{
            type: DataTypes.DECIMAL
        },
        // 月收益
        month_revenue:{
            type: DataTypes.DECIMAL
        },
        // 余额
        balance:{
            type: DataTypes.DECIMAL
        },
        // 提现申请
        status:{
            type: DataTypes.INTEGER
        },
        // 提现申请
        status_name:{
            type: DataTypes.STRING
        },
        // 拒绝提现原因
        rejection_reason:{
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