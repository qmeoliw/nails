import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NewReq() {
  const navigate = useNavigate();
  const [masters, setMasters] = useState([]);
  const [masterId, setMasterId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("")

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://localhost:3000/masters")
      .then((res) => res.json())
      .then((data) => setMasters(data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!masterId || !date || !time) {
      setMessage("Заполните все поля");
      return;
    }

    const datetime = `${date} ${time}:00`;

    try {
      const res = await fetch("http://localhost:3000/newreq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_user: userId,
          id_master: masterId,
          booking_datetime: datetime,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Заявка создана!");
        navigate("/profile");
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage("Ошибка сервера");
    }
  };

  const hours = [];
  for (let i = 8; i <= 18; i++) {
    hours.push(`${i}:00`);
  }

  const today = new Date().toISOString().split("T")[0];
    const handleLogout = () => {
    localStorage.clear()
    navigate("/autor")
  }

  return (
    <>
      <div className="  min-h-screen flex justify-center items-center flex-col transition-colors duration-300">
        <div className="border border-gray-500  rounded-xl p-8 hover:shadow-lg bg-white ">

        <h1 className="m-3 font-extrabold text-3xl text-gray-800 ">Создание новой заявки</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="">Мастер:</label>
            <select
              className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "

  
              value={masterId}
              onChange={(e) => setMasterId(e.target.value)}
              required
            >
              <option 
               value="">Выберите мастера</option>
              {masters.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="">Выберите дату:</label>
          <input
              className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "

            type="date"
            name=""
            id=""
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
          />
          <div className="mb-6">
            <label className="">Время (8:00-18:00):</label>
            <select
                            className="m-1 bg-pink-100  rounded-xl focus:outline-none focus:border-indigo-200 focus:shadow-md transition duration-300 py-2 px-3 text-gray-800  placeholder-gray-500 "

              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              <option value="">Выберите время</option>
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="flex-1 p-2 bg-pink-500 text-white py-2 rounded"
          >
            Создать
          </button>
        </form>
        </div>
        <button onClick={handleLogout}>Выйти</button>
      </div>
    </>
  );
}
export default NewReq;
