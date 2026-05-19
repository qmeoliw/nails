import express from "express"
import cors from "cors"
import { selectAll } from "./controllers/selectAll.js"
import { connection } from "./connectDB.js"
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/',selectAll)

app.get('/profile', async(req, res)=>{
    try{
        const sql= `SELECT 
                r.id,
                r.booking_datetime,
                m.name as master_name,
                CASE 
                    WHEN r.id_status = 1 THEN 'Новая'
                    WHEN r.id_status = 2 THEN 'Подтверждена'
                    WHEN r.id_status = 3 THEN 'Отклонена'
                END as status_name
            FROM request r
            LEFT JOIN master m ON r.id_master = m.id
            ORDER BY r.booking_datetime DESC`
        const [results] = await connection.query(sql)
        res.json(results)
    }
    catch(error){
        console.error("Ошибка сервера:", error);
        res.status(500).json({error: "Ошибкааа"})
        

    }
})

app.post('/regist', async(req,res)=>{
    const{full_name, phone, login, password}=req.body
    console.log('данные получены:',{full_name, phone, login, password});
        if (!full_name || !phone || !login || !password) {
        return res.status(400).json({ error: 'Все поля обязательны' });
    }
    
    if (full_name.length < 5) {
        return res.status(400).json({ error: 'ФИО должно быть минимум 5 символов' });
    }
    
    if (!login.includes('@')) {
        return res.status(400).json({ error: 'Неверный формат email' });
    }
    
    if (password.length < 5) {
        return res.status(400).json({ error: 'Пароль должен быть минимум 5 символов' });
    }
    try{
        const[existing]=await connection.query(
            'SELECT * FROM user WHERE login = ?',
            [login]
        )
                if (existing.length > 0) {
            return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
        }
        const [result]=await connection.query(
            'INSERT INTO user(full_name, phone, login, password, id_role) VALUES(?, ?, ?, ?, 1)',
            [full_name, phone, login, password]
        )
        res.status(201).json({
            success:true
        })
    }catch(error){
        console.error('ошибка', error)
        res.status(500).json({ error: 'Ошибка сервера' })
    }
    
})
app.post('/autor',async(req, res)=>{
    const{login, password}=req.body
    if(!login || !password){
        return res.status(400).json({error:'Заполните все поля'})

    }

    if(login==='beauty@gmail.com' && password ==='pass!!!!'){
        return res.json({
             success: true,
            id_role:2,
            role:'admin',
            full_name: 'Admin',
            message: 'Вход выполнен',
            id:2

        })
    }
    try{
        const [user]=await connection.query(
            'SELECT * FROM user WHERE login = ? and password = ?', [login, password]
        )
         if (user.length === 0) {
            return res.status(401).json({ error: 'Неверный логин или пароль' });
        }
                const isAdmin = user[0].id_role === 2
        console.log('id_role:', user[0].id_role)
        console.log('isAdmin (админ если id_role=2):', isAdmin)
        res.json({ 
            success: true, 
            role: isAdmin ? 'admin' : 'user',
            full_name: user[0].full_name,
            message: 'Вход выполнен',
            id:user[0].id,
            id_role:user[0].id_role
        });
    }catch (error) {
        console.error('Ошибка входа:', error)
        res.status(500).json({ error: 'Ошибка сервера' })
    }
})
app.get('/admin', async (req, res) => {
    try {
        const sql = `
            SELECT 
                r.id,
                r.booking_datetime,
                u.full_name,
                u.phone,
                m.name,
                r.id as id_status
            FROM request r
            LEFT JOIN master m ON r.id_master = m.id
            LEFT JOIN user u ON r.id_user = u.id
            ORDER BY r.booking_datetime DESC
        `
        const [results] = await connection.query(sql)
        res.json(results)
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ error: "Ошибка сервера" })
    }
})
app.post('/admin/update-status', async (req, res) => {
    const { booking_id, new_status } = req.body
    
    
    
    try {
        await connection.query(
            'UPDATE request SET id = ? WHERE id = ?',
            [new_status, booking_id]
        )
        
        res.json({ success: true, message: 'Статус обновлен' })
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ error: "Ошибка сервера" })
    }
})

app.get('/masters', async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM master');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


app.post('/newreq', async (req, res) => {
    const { id_user, id_master, booking_datetime } = req.body;
    
    try {

        const [existing] = await connection.query(
            'SELECT * FROM request WHERE id_master = ? AND booking_datetime = ?',
            [id_master, booking_datetime]
        );
        
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Время уже занято' });
        }
        

        await connection.query(
            'INSERT INTO request (id_user, id_master, booking_datetime,id_status) VALUES (?, ?, ?, 1)',
            [id_user, id_master, booking_datetime]
        );
        
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})