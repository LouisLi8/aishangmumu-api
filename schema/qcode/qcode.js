module.exports = function(sequelize,DataTypes){
    return sequelize.define('qcode',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        src: {
            type: DataTypes.STRING
        },
        tel: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING
        },
        wechat: {
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