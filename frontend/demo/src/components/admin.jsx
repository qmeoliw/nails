import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Admin(){
    const navigate=useNavigate()
    const [bookings, setBookings] = useState([])

      useEffect(() => {
    loadBookings()
  }, [])
  const loadBookings = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка загрузки");
    } 
  }
  const changeStatus = async (bookingId, currentStatus) => {
    let newStatus
    let statusText
    

    if (currentStatus === 1) {
      newStatus = 4
      statusText = "Подтверждена"
    } else if (currentStatus === 4) {
      newStatus = 3
      statusText = "Отклонена"
    } else {
      newStatus = 1
      statusText = "Новая"
    }
    
    if (!window.confirm(`Изменить статус на "${statusText}"?`)) {
      return
    }
    
    try {
      const response = await fetch("http://localhost:3000/admin/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: bookingId,
          new_status: newStatus,
        }),
      })
      
      if (response.ok) {
        alert("Статус изменен!")
        loadBookings()
      } else {
        alert("Ошибка при изменении")
      }
    } catch (error) {
      console.error("Ошибка:", error)
      alert("Не удалось изменить статус")
    }
  }
    const getStatusText = (status) => {
    switch (status) {
      case 1: return " Новая"
      case 4: return " Подтверждена"
      case 3: return " Отклонена"
      default: return "Неизвестно"
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate("/autor")
  }

    const newCount = bookings.filter(b => b.id_status === 1).length
    const confirmedCount = bookings.filter(b => b.id_status === 4).length
    const rejectedCount = bookings.filter(b => b.id_status === 3).length


    return(
        <>
        <div className=" min-h-screen transition-colors duration-300 p-4 ">
            <h1 className="m-3 font-extrabold text-3xl text-gray-800 ">Добро пожаловать, Admin</h1>
            
            <h3 className=" font-extrabold text-xl text-gray-900 ">Всего:</h3>
            <p>{bookings.length}</p>
            <h3 className=" font-extrabold text-xl text-gray-900 ">Новых:</h3>
            <p>{newCount}</p>
            <h3 className=" font-extrabold text-xl text-gray-900 ">Подтвержденных:</h3>
            <p>{confirmedCount}</p>
            <h3 className=" font-extrabold text-xl text-gray-900 ">Отклоненных:</h3>
            <p>{rejectedCount}</p>

<div className='grid overflow-hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>

 <table className="m-3 p-3  w-full min-w-[800px] border border-gray-500  rounded-xl hover:shadow-lg bg-white ">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">ФИО клиента</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Телефон</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Мастер</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Дата и время</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Статус</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Действие</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-4 py-3 border-t">{booking.id}</td>
                <td className="px-4 py-3 border-t">{booking.full_name || "Не указан"}</td>
                <td className="px-4 py-3 border-t">{booking.phone || "Не указан"}</td>
                <td className="px-4 py-3 border-t">{booking.name || "Не указан"}</td>
                <td className="px-4 py-3 border-t">{new Date(booking.booking_datetime).toLocaleString("ru-RU")}</td>
                <td className="px-4 py-3 border-t">{getStatusText(booking.id_status)}</td>
                <td>
                  <button
                  className='m-3 hover:bg-pink-100 dark:hover:bg-pink-800 rounded-xl font-semibold py-1 px-4 border border-gray-300 '
                    onClick={() => changeStatus(booking.id, booking.id)}
                    
                  >
                    Изменить статус
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
</div>
            <button onClick={handleLogout}>Выйти</button>
        </div>
        </>
    )
}
export default Admin