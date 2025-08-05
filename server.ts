import express from "express"
import { config } from "dotenv"
import { Database } from "./DB/db"
import { routers } from "./routes"
config()

Database;
const app = express();
app.use(express.json())


app.use('/',routers)

app.get('/',(req,res)=>{
    res.status(200).json({
        message: 'welcome'
    })
});

const port = parseInt(process.env.PORT || '5500');
app.listen(port,()=>{
    console.log("Our Server are running  successful")
});

