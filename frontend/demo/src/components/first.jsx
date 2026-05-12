 import { Link } from 'react-router-dom';
 function First(){
    return(

    <div className='flex justify-center items-center h-screen'>
        <div className='text-center'>
    <h1 className='m-3'>Добро пожаловать в маникюрный салон<br />
    <span className='font-extrabold text-lg '>&CoolNails&</span> </h1>
    <button className='m-3 hover:bg-green-100 dark:hover:bg-green-800 rounded-xl font-semibold py-1 px-4 border border-gray-300'>
        <Link to="autor">Войти в профиль</Link></button>
    <button  className='m-3 hover:bg-pink-100 dark:hover:bg-pink-800 rounded-xl font-semibold py-1 px-4 border border-gray-300 '>
        <Link to="regist">Зарегистрироваться</Link></button>
    </div>
        </div>

    )
 }
 export default First