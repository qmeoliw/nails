import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


function Profile() {
  const [bookings, setBookings] = useState([])

  const navigate=useNavigate()

  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchReq = async () => {
      try {
        const response = await fetch("http://localhost:3000/profile");
        if (!response.ok) {
          throw new Error("ошибка данных уу");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("ошибкааа:", error);
      }
    };
    fetchReq();
  }, []);
    const handleLogout = () => {
    localStorage.clear()
    navigate("/autor")
  }

  return (
    <>
      <div className=" min-h-screen transition-colors duration-300 p-4 ">
        <div>
          <h1 className="m-3 font-extrabold text-3xl text-gray-800 ">
            Добро пожаловать,{userName}{" "}
          </h1>
          <p className="text-2xl font-bold mb-4 text-gray-800 ">Ваши заявки:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => {
            return (
              <div
                className="m-3 border border-gray-500  rounded-xl p-8 hover:shadow-lg bg-white "
                key={booking.id}
              >
                <p>
                  {" "}
                  <span className="text-gray-700 text-xl font-bold">
                    Мастер:
                  </span>{" "}
                  {booking.master_name}
                </p>
                <p>
                  <span className="text-gray-700 text-xl font-bold">
                    Статус:
                  </span>{" "}
                  {booking.status_name}
                </p>
                <p>
                  <span className="text-gray-700 text-xl font-bold">
                    Время:
                  </span>{" "}
                  {new Date(booking.booking_datetime).toLocaleString("ru-RU")}
                </p>
              </div>
            );
          })}
        </div>
        <button onClick={() => navigate("/newreq")} className="m-2 p-2 hover:bg-green-100  rounded-xl font-semibold py-2 px-4 border  whitespace-nowrap">
          Создать новую заявку
        </button>
        <button onClick={handleLogout}>Выйти</button>
      </div>
    </>
  );
}
export default Profile;
