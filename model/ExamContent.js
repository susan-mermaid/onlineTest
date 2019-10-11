const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
    "soal", 
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nosoal:{
            type:Sequelize.INTEGER
        },
        pertanyaan:{
            type:Sequelize.STRING
        },
        opsia:{
            type:Sequelize.STRING
        },
        opsib:{
            type:Sequelize.STRING
        },
        opsic:{
            type:Sequelize.TINYINT
        },
        opsid:{
            type:Sequelize.INTEGER
        },
        opsie:{
            type:Sequelize.INTEGER
        },
    },
    {
        timestamps:false,
        freezeTableName: true
    }
)