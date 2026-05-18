import { connection } from "../connectDB.js";

export function  selectAll(req, res){
    connection.query("SELECT * FROM master",
    function(err, results, fields) {
      console.log(err);
      console.log(results); // собственно данные
      console.log(fields); // мета-данные полей 
    });
}