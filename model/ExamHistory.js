const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
    "hasil", 
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        waktu:{
            type:Sequelize.STRING
        },
        nosoal:{
            type:Sequelize.INTEGER
        },
        guru:{
            type:Sequelize.STRING
        },
        kelas:{
            type:Sequelize.STRING
        },
        lembaga:{
            type:Sequelize.STRING
        },
        jenis_tes:{
            type:Sequelize.STRING
        },
        nama:{
            type:Sequelize.STRING
        },
        userid:{
            type:Sequelize.STRING
        },
        benar:{
            type:Sequelize.INTEGER
        },
        salah:{
            type:Sequelize.INTEGER
        },
        nilai:{
            type:Sequelize.INTEGER
        },
        lama:{
            type:Sequelize.STRING
        }
    },
    {
        timestamps:false,
        freezeTableName: true
    }
)