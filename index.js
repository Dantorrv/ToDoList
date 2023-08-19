import Express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import _ from "lodash";

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


var itemsinDB=[];

const itemSchema = ({
    name: {
        type: String,
     require: true 
    }   
    });
const Item = mongoose.model('Item', itemSchema);

const listSchema=({
    name: String,
    items: [itemSchema]
});

const List=mongoose.model("List", listSchema);

  const item1= new Item({
    name:"First"  
  });
  const item2= new Item({
   name:"Second"
  });
  const item3= new Item({
   name:"Third"
  });

  const defaultItems=[item1, item2, item3];


  main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

    

    if(itemsinDB==0){
    //    Item.insertMany(defaultItems);
       }        

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



app.get("/",async (req,res)=>{

        
    const itemsinDB= await Item.find({});
    itemsinDB.forEach(item => {
        console.log(item);    
    });

    res.render("index.ejs",{itemsinDB: itemsinDB, listTitle: dayToday(), monthPresent: monthToday(),});
})

app.post("/", async (req,res)=>{

    const itemName=req.body.newTask;
    const listName=req.body.list;
    if(req.body.newTask!=""){
    const newItem=new Item({
        name: req.body.newTask
    });
    if (listName==dayToday()){
        newItem.save();
        res.redirect("/");
    } else {
        const pushNewItem= await List.findOne({name: listName})
        pushNewItem.items.push(newItem);
        pushNewItem.save();
        res.redirect("/"+listName);
    }

    }

  
})

app.post("/delete",async (req,res)=>{
    const listName = req.body.listName;
    console.log(req.body.checkbox);
    const checkId=req.body.checkbox;
    if(listName==dayToday()){
        const deleted =await Item.findByIdAndRemove(checkId);
        console.log(deleted);
        res.redirect("/");

    }else{
        await List.findOneAndUpdate({name: listName},{$pull:{items: {_id: checkId}}}); 
        res.redirect("/"+listName);
    }
    
})

app.get("/:Lists",async (req,res)=>{
   const newList = _.capitalize(req.params.Lists);
   console.log(newList);
   const checkOne=await List.findOne({name: newList});
   if(!checkOne){
       const list= new List ({
        name: newList,
        items: defaultItems
        });   
        list.save();
        console.log("created new list");
        res.redirect("/"+newList);
    } else {
        res.render("index.ejs",{ listTitle: checkOne.name, itemsinDB: checkOne.items})
        console.log("list already exists");       
    }
})



app.listen(port,()=>{
    console.log("server is runnign on port "+port);
})


  
  



  
    
