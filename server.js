const express=require("express"),
     bodyParser=require("body-parser"),
     mongoose=require("mongoose");

const app=express();
const items=require('./routes/api/items');
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//body parser middleware
app.use(bodyParser.json());
//DB config
const db=require('./config/keys').mongoURI;
//connect to mongodb
mongoose.connect('mongodb://localhost:27017/itemdb').then(()=>{
    console.log("Database Connected ...")}).catch((err)=>{
        console.log(err);
    });

app.use('/api/items',items);    

const port=process.env.port||5000;
//connect to server
app.listen(port,()=>console.log(`server connected on port  ${port}`));



