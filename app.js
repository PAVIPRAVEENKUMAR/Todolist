const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.set('view engine',"ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo");
const trySchema = new mongoose.Schema({
    name: String
});
const item = mongoose.model("task",trySchema);
app.get("/", async function (req, res) {
    try {
      const foundItems = await item.find({});
      res.render("list", { ejes: foundItems });
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred");
    }
  });
app.post("/", async function (req, res) {
    const itemName = req.body.ele1;
    const todo4 = new item({
      name: itemName,
    });
    try {
      await todo4.save();
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.status(500).send("an error occurred");
    }
  });
app.post("/delete", async function (req, res) {
    const checked = req.body.checkbox1;
    try {
      const result = await item.findByIdAndRemove(checked).exec();
      if (result) {
        console.log("deleted");
        res.redirect("/");
      } else {
        console.log("Item Not found");
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error found");
    }
  });
  
    
app.listen(3000,function(){
    console.log("server is running");
});