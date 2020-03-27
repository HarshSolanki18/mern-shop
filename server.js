const express=require("express"),
     bodyParser=require("body-parser"),
     mongoose=require("mongoose"),
     path=require("path"),
     config=require("config");

const app=express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

//body parser middleware
app.use(bodyParser.json());
//DB config
const db=config.get('mongoURI');
//connect to mongodb  mongodb://localhost:27017/itemdb
mongoose.connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log("Database Connected ...")}).catch((err)=>{
        console.log(err);
    });

app.use('/api/items',require('./routes/api/items'));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));    

//serve static assets if in production
if(process.env.NODE_ENV=='production'){
    ///set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })

}
const port=process.env.PORT||5000;
//connect to server
app.listen(port,()=>console.log(`server connected on port  ${port}`));



//timeout