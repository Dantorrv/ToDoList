import Express  from "express";
import bodyParser from "body-parser";


function dayToday() {
    var whatDay= new Date().getDay();
    if (whatDay==0) {
     whatDay="Sunday";
    } else if(whatDay==1){
     whatDay="Monday";
    }
    else if(whatDay==2){
     whatDay="Tuesday";
 }
 else if(whatDay==3){
     whatDay="Wednesday";
 }
 else if(whatDay==4){
     whatDay="Thursday";
 }
 else if(whatDay==5){
     whatDay="Friday";
 }
 else if(whatDay==6){
     whatDay="Saturday";
 }
 return whatDay
   } 

function monthToday() {
 var whatMonth= new Date().getMonth();
    if (whatMonth==0) {
     whatMonth="January";
    } else if(whatMonth==1){
     whatMonth="February";
    }
    else if(whatMonth==2){
     whatMonth="March";
 }
 else if(whatMonth==3){
     whatMonth="April";
 }
 else if(whatMonth==4){
     whatMonth="May";
 }
 else if(whatMonth==5){
     whatMonth="June";
 }
 else if(whatMonth==6){
     whatMonth="July";
 }
 else if(whatMonth==7){
     whatMonth="August";
 }
 else if(whatMonth==8){
     whatMonth="September";
 }
 else if(whatMonth==9){
     whatMonth="October";
 }else if(whatMonth==10){
     whatMonth="November";
 }
 else if(whatMonth==11){
     whatMonth="December";
 }
 return whatMonth
} 

const app=Express();
const port=3000; 
var tasklength=0;
var taskNumber=[];
var worklength=0;
var workNumber=[];
var flagWork=1;


var listTitles=["Today", "Work"]
var listRoute=["", "work"]

app.use(bodyParser.urlencoded({extended:true}));
app.use(Express.static("public"));

app.get("/create", (req,res)=>{
    res.render("create.ejs",{listRoute: listRoute,listTitles: listTitles, taskList: tasklength, taskPrompt: taskNumber, dayPresent: dayToday(), monthPresent: monthToday(),});
})

app.get("/", (req,res)=>{
    res.render("index.ejs",{listRoute: listRoute, listTitles: listTitles, taskList: tasklength, taskPrompt: taskNumber, dayPresent: dayToday(), monthPresent: monthToday(),});
})

app.post("/", (req,res)=>{
    if(req.body.newTask!=""){
    taskNumber[tasklength]= req.body.newTask;    
    tasklength++;
    res.render("index.ejs",{listRoute: listRoute, listTitles: listTitles, taskList: tasklength, taskPrompt: taskNumber, dayPresent: dayToday(), monthPresent: monthToday(),});
    } else{
        res.render("index.ejs",{listRoute: listRoute, listTitles: listTitles, taskList: tasklength, taskPrompt: taskNumber, dayPresent: dayToday(), monthPresent: monthToday(),});
    }   
})

app.get("/work", (req,res)=>{

    res.render("index.ejs",{flagWork:flagWork, listRoute: listRoute, listTitles: listTitles, flagWork: flagWork ,taskList: worklength, taskPrompt: workNumber, dayPresent: dayToday(), monthPresent: monthToday(),});   
})

app.post("/work", (req,res)=>{

    if(req.body.newTask!=null){
    workNumber[worklength] = req.body.newTask;    
    worklength++;
    var month=monthToday();
    res.render("index.ejs",{flagWork: flagWork, listRoute: listRoute, listTitles: listTitles, taskList: worklength, taskPrompt: workNumber, dayPresent: dayToday(), monthPresent: monthToday(),});
    } else{
        res.render("index.ejs",{flagWork: flagWork, listRoute: listRoute, listTitles: listTitles, taskList: worklength, taskPrompt: workNumber, dayPresent: dayToday(), monthPresent: monthToday(),});
    }
    
})

app.listen(port,()=>{
    console.log("server is runnign on port "+port);
})