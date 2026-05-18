import mysql from "mysql2/promise"
  export const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "nails",
        password: "1234"
      })
    
       connection.connect(function(err){
          if (err) {
            return console.error("Ошибка: " + err.message);
          }
          else{
            console.log("Подключение к серверу MySQL успешно установлено");
          }
       });