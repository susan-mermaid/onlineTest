var express = require("express");
var md5 = require("md5")
var router = express.Router();
const User = require("../model/User");

router.post("/login", (req, res)=>{
    
    var pwd = md5(req.body.pwd)
    User.findOne({where:{nama_siswa:req.body.name, password:pwd}})
        .then(data=> {
            var now = new Date();
            var datetime = now.getFullYear() + "-" + (now.getMonth() + 1)+ '-' +now.getDate() + " " + now.toLocaleTimeString() ;
            User.update({lastlogin:datetime}, {where:{nama_siswa:req.body.name, password:req.body.pwd}})
            res.json(data)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

router.get("/getip", (req, res)=>{
    var ip = req.connection.remoteAddress;
    if(ip == "::1"){
        ip = "127.0.0.1"
    }
    res.send(ip)
})
module.exports = router;