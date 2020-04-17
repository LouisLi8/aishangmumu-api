const Sequelize = require('sequelize');
// const sequelize = new Sequelize('aishangmumu','root','root',{
const sequelize = new Sequelize('asmm','asmm','asmmadmin',{
<<<<<<< HEAD
    host:'127.0.0.1',
=======
    host:'39.100.196.120',
>>>>>>> d5da41dd08a277737e2ef6d3a6ab44b039bffb6a
    dialect:'mysql',
    operatorsAliases:false,
    dialectOptions:{
        //字符集
        charset:'utf8mb4',
        collate:'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00'  //东八时区
});

module.exports = {
    sequelize
};
