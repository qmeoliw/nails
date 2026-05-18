import express from "express"
import { selectAll } from "./controllers/selectAll.js"
import { connection } from "./connectDB.js"
const app = express()
const port = 3000

app.get('/',selectAll)

app.get('/profile', async(req, res)=>{
    try{
        const sql= "SELECT * FROM request"
        const [results] = await connection.query(sql)
        res.json(results)
    }
    catch(error){
        console.error("Ошибка сервера:", error);
        res.status(500).json({error: "Ошибкааа"})
        

    }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})