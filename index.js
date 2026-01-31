const express = require("express");
const app = express();
const port =8080;
const path = require("path");
const { v4 : uuidv4 }= require ('uuid');

uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[

{
    id:uuidv4(),
    username:"shrusti",
    content:"apna collage"
},
{
    id:uuidv4(),
    username:"shraddha",
    content:"success important"
},
{
    id:uuidv4(),
    username:"rutuja",
    content:"internship"
}   
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
//   console.log(req.body);//usern enter form data console me ayaega
//   res.send("post request working")
res.redirect("/posts")
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post= posts.find((p)=> id === p.id);
//    console.log(post);
//     res.send("request working")
res.render("show.ejs",{post});
})

app.listen(port,()=>{
console.log("listerning on port:8080")
}); 