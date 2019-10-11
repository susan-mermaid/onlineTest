const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
    "siswa_temp", 
    {
        nis:{
            type: Sequelize.STRING,
            primaryKey: true
        },
        nama_siswa:{
            type:Sequelize.STRING
        }
    },
    {
        timestamps:false,
        freezeTableName: true
    }
)