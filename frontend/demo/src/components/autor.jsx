import { Link, useNavigate  } from "react-router-dom"
function Autor(){
    return(
        <>
                <div className=" min-h-screen flex justify-center items-center flex-col  duration-300">
                    <div className="p-2 border rounded-xl m-2 bg-slate-100 border-gray-500 ">
            <h1 className="m-3 font-extrabold text-3xl text-gray-800 ">Добро пожаловать</h1>
            <form action="">
            <p>Введите почту:</p>
            <input  className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 " type="email" name="" placeholder="Введите почту" id="" />
            <p>Введите пароль:</p>
            <input className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "  type="password" name="" placeholder="Введите пароль" id="" />
            <button className="m-3 py-2 px-2 bg-pink-200  border hover:bg-indigo-100  rounded-xl">Войти</button>
            <p className="text-gray-600 ">Hет акканта?</p> 
            <button className="text-green-900">
                <Link to="/regist">Зарегистрироваться</Link>
            </button>

            </form>

                    </div>
                                <button className="m-3 font-extrabold  text-gray-800">
                <Link to="/first">
                Главная
                </Link>
            </button>
        </div>
        </>
    )
}
export default Autor