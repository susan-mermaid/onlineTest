var express = require("express");
var router = express.Router();
const Examlist = require("../model/ExamList");
const ExamHistory = require("../model/ExamHistory")

router.post("/examlist", (req, res)=>{
    var current =  new Date();
    ExamHistory.findAll({where:{userid:req.body.id}})
        .then(data=> {
            if(data.length === 0){
                Examlist.findAll()
                    .then(examdata=> {
                        res.json(examdata)
                    })
                    .catch(err => {
                        res.send("error: " + err)
                    })
            }else{
                var preExams = []
                data.forEach(function(element){
                    preExams.push(element.dataValues.nosoal)
                })
                Examlist.findAll({
                    where:{
                        nosoal:{notIn:preExams},
                        WaktuMulai:{lte:current},
                        WaktuTutup:{gte:current}
                    }
                })
                    .then(examdata=> {
                        
                        res.json(examdata)
                    })
                    .catch(err => {
                        res.send("error: " + err)
                    })
            }
        })
        .catch(err => {
            res.send("error: " + err)
        })
 
})

router.post("/examdetail", (req, res)=>{
    Examlist.findOne({where:{nosoal:req.body.examId}})
    .then(data=> {
        res.json(data)
    })
    .catch(err => {
        res.send("error: " + err)
    })
})

router.post("/checktoken",(req, res)=>{
    Examlist.findOne({where:{nosoal:req.body.examId, password:req.body.token}})
        .then(data=>{
            res.json(data)
        })
        .catch(err =>{
            res.send("error:" + err)
        })
})

module.exports = router;