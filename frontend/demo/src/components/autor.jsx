import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Autor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.login || !formData.password) {
      setError("Заполните все поля");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/autor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: formData.login,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("role", data.role)
        localStorage.setItem("userName", data.full_name)
        localStorage.setItem("userId", data.id); 

        alert("Вход выполнен успешно!");

        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      } else {
        setError(data.error || "Ошибка входа");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setError("Не удалось подключиться к серверу");
    }
  };

  return (
    <>
      <div className=" min-h-screen flex justify-center items-center flex-col  duration-300">
        <div className="p-2 border rounded-xl m-2 bg-slate-100 border-gray-500 ">
          <h1 className="m-3 font-extrabold text-3xl text-gray-800 ">
            Добро пожаловать
          </h1>
          <form action="" onSubmit={handleSubmit}>
            <p>Введите почту:</p>
            <input
              className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "
              type="email"
              name="login"
              value={formData.login}
              placeholder="Введите почту"
              id=""
              onChange={handleChange}
            />
            <p>Введите пароль:</p>
            <input
              className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "
              type="password"
              name="password"
              value={formData.password}
              placeholder="Введите пароль"
              id=""
              onChange={handleChange}
            />
            <button className="m-3 py-2 px-2 bg-pink-200  border hover:bg-indigo-100  rounded-xl">
              Войти
            </button>
            <p className="text-gray-600 ">Hет акканта?</p>
            <button className="text-green-900">
              <Link to="/regist">Зарегистрироваться</Link>
            </button>
          </form>
        </div>
        <button className="m-3 font-extrabold  text-gray-800">
          <Link to="/first">Главная</Link>
        </button>
      </div>
    </>
  );
}
export default Autor;
