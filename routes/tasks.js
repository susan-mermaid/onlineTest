var express = require("express");
var router = express.Router();
const Task = require("../model/Task");

router.get("/tasks", (req, res)=>{
    Task.findOne({where:{nama_siswa:'BIMA TEGAR ARIESTO', password:'827ccb0eea8a706c4c34a16891f84e7b'}})
        .then(tasks=> {
            res.json(tasks)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})


module.exports = router;