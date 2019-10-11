var express = require("express");
var bodyParser = require("body-parser");

var tasks = require("./routes/tasks");
var login = require("./routes/login");

var examlist = require("./routes/examlist");
var examcontent =  require("./routes/examcontent");
var examhistory = require("./routes/examhistory");
var cors = require("cors");

var port = 10001;

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened:false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api", tasks);
app.use("/api", login);
app.use("/api", examlist)
app.use("/api", examcontent)
app.use("/api", examhistory)



app.listen(port, function(){
    console.log('Server started on port' + port);
})
