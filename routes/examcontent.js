var express = require("express");
var router = express.Router();
const ExamContent = require("../model/ExamContent");
const ExamHistory = require("../model/ExamHistory");
const seq = require("sequelize")
const Op = seq.Op 

router.post("/examcontent",(req, res)=>{
    ExamContent.findAll({where:{nosoal:req.body.examId}})
        .then(data=>{
            var senddata = data.slice(0, req.body.dispcnt)
            res.json(senddata)
        })
        .catch(err =>{
            res.send("error:" + err)
        })
})

router.post("/sendResult", (req, res)=>{
    var cond = []
    var answers = req.body.answers
    for(probId in answers){
        var condTemp = {}
        condTemp = {id:probId, kunci:answers[probId.toString()]}
        cond.push(condTemp)
    }
    
    ExamContent.findAndCountAll({where:{[Op.or]: cond }})
        .then(result => {
            //***for inseting table hasil ***/
            var now = new Date()
            waktu = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.toLocaleTimeString()
            nosoal = req.body.nosoal
            guru   = req.body.guru
            kelas  = req.body.kelas
            jenis_tes = req.body.jenis_tes
            nama = req.body.nama
            userid = req.body.userid
            benar = result.count
            salah = parseInt(req.body.totalcnt) - benar
            nilai = Math.ceil(100 * benar / parseInt(req.body.totalcnt))
            lama  = req.body.lama
            ExamHistory.create({
                waktu: waktu,
                nosoal: nosoal,
                guru: guru,
                kelas: kelas,
                jenis_tes: jenis_tes,
                nama: nama,
                userid: userid,
                benar:benar,
                salah: salah,
                nilai: nilai,
                lama: lama
            }).then(data =>{
                // res.send('correct answers: ' + result.count + ": " + )
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
            
        })
        .catch(err => {
            res.send(err)
        })
      
    
})

module.exports = router;