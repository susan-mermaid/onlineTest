var express = require("express");
var router = express.Router();
const ExamHistory = require("../model/ExamHistory")



router.post("/examhistory", (req, res)=>{
    ExamHistory.findAll({where:{userid:req.body.id}})
        .then(data=> {
            res.json(data)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})


module.exports = router;