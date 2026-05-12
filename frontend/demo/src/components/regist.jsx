import { useState } from "react";
import { Link } from "react-router-dom";

function Registor() {
    const[fio, setFio]=useState('')
    const[num, setNum]=useState('')
    const[email, setEmail]=useState('')
    const[pass, setPass]=useState('')
  const checkForm = () => {};

  return (
    <>
      <div className="  min-h-screen flex justify-center items-center flex-col transition-colors duration-300">
        <div className="border border-gray-500  rounded-xl p-8 hover:shadow-lg bg-white ">
          <h1 className="m-3 font-extrabold text-3xl text-gray-800 ">
            Регистрация
          </h1>
          <form action="">
            <p>Введите ФИО:</p>
            <input
              className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "
              type="text"
              name=""
              id=""
              placeholder="ФИО"
              onChange={(e)=>setFio(e.target.value)}
            />
            <p>Введите номер телефона:</p>
            <input
              className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "
              type="text"
              name=""
              id=""
              placeholder="+7 (999)-999-99-99"
              onChange={(e)=>setNum(e.target.value)}
            />
            <p>Введите логин:</p>
            <input
              className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "
              type="email"
              name=""
              id=""
              placeholder="example@gmail.com"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <p>Введите пароль:</p>
            <input
              className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "
              type="password"
              onChange={(e)=>setPass(e.target.value)}
            />
            <button className="m-3 py-2 px-2 bg-pink-200  border hover:bg-indigo-100  rounded-xl">
              Зарегистрироваться
            </button>
            <p className="text-gray-600 ">
              Уже есть аккаунт?{" "}
              <button className="text-green-900 ">
                {" "}
                <Link to="/autor">Войти</Link>
              </button>
            </p>
          </form>
        </div>
        <button className="m-3 font-extrabold  text-gray-800">
          <Link to="/first">Главная</Link>
        </button>
      </div>
    </>
  );
}
export default Registor;
