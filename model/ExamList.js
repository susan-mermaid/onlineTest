const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
    "opsi_soal", 
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nosoal:{
            type:Sequelize.INTEGER
        },
        nama:{
            type:Sequelize.STRING
        },
        untuk:{
            type:Sequelize.STRING
        },
        materi:{
            type:Sequelize.STRING
        },
        waktu:{
            type:Sequelize.TINYINT
        },
        jumlahsoal:{
            type:Sequelize.INTEGER
        },
        disajikan:{
            type:Sequelize.INTEGER
        },
        opsi:{
            type:Sequelize.TINYINT
        },
        metode:{
            type:Sequelize.STRING
        }
        ,WaktuMulai:{
            type:Sequelize.DATE
        }
    },
    {
        timestamps:false,
        freezeTableName: true
    }
)