import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registor() {

    const navigate=useNavigate()
    const[formData, setFormData]=useState({
      full_name:'',
      phone:'',
      login:'',
      password:''
    })
    const [error, setError] = useState('')


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('') 
    }

  const checkForm = async (e) => {
    e.preventDefault()
    
    if(formData.full_name.length<5 || !formData.phone || !formData.login || !formData.login.includes('@')  || !formData.password.includes('!')|| formData.password.length<5){
        alert('Ошибка в заполнение данных')
        return
    }

    try{
      const response= await fetch('http://localhost:3000/regist',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      })
      const data=await response.json()
      if(response.ok){
        alert('Успех')
        navigate('/autor')
      }else{
        alert(data.error)
      }
    } catch(error){
      console.error('Ошибка:', error)

    }
  };

  return (
    <>
      <div className="  min-h-screen flex justify-center items-center flex-col transition-colors duration-300">
        <div className="border border-gray-500  rounded-xl p-8 hover:shadow-lg bg-white ">
          <h1 className="m-3 font-extrabold text-3xl text-gray-800 ">
            Регистрация
          </h1>
          <form action="" onSubmit={checkForm}>
            <p>Введите ФИО:</p>
            <input
              className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "
              type="text"
              name="full_name"
              value={formData.full_name}
              id=""
              placeholder="ФИО"
              onChange={handleChange}
            />
            <p>Введите номер телефона:</p>
            <input
              className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "
              type="text"
              name="phone"
              value={formData.phone}
              id=""
              placeholder="+7 (999)-999-99-99"
              onChange={handleChange}
            />
            <p>Введите логин:</p>
            <input
              className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "
              type="email"
              name="login"
              value={formData.login}
              id=""
              placeholder="example@gmail.com"
              onChange={handleChange}
            />
            <p>Введите пароль:</p>
            <input
              className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
