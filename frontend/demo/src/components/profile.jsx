import { useEffect } from "react"
import { Link } from "react-router-dom"

function Profile(){

    useEffect(()=>{
        const fetchReq=async()=>{
            try{
                const response= await fetch('http://localhost:3000/profile')
                if(!response.ok){
                    throw new Error('ошибка данных уу')
                }
                const data = await response.json()
            }
            catch(error){
                console.error('ошибкааа:', error)
    
            }
        }
        fetchReq()

    },[])



    return(
        <>
        <div>
            <h1>Добро пожаловать, </h1>
            <p>Ваши заявки:</p>
            <button>Создать новую заявку</button>
            <div></div>
        </div>
        </>
    )
}
export default Profile