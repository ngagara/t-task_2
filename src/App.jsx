import { useState, useEffect } from 'react';
import { setLocalTimeDispatch, setTimeArrival, setReturnTicketTimes } from './support';
import { DEFAULT_VALUE, ROUTES } from './constants';
import Moment from "react-moment";
import './index.css';

const App = () => {
  const [roundTrip, setroundTrip] = useState([]);
  const [data, setData] = useState(DEFAULT_VALUE);
  const [accum, setAccum] = useState({});
  const returnValueTicket = "из A в B и обратно в А";
  const returnTicket = setReturnTicketTimes(roundTrip.b, accum.arrival_time);
  const showTicketA = data.route === returnValueTicket && returnTicket && returnTicket.length;
  const disabledButton = data.tickets <= 0 || returnTicket && !returnTicket.length;

  useEffect(() => {
    setAccum((prev) => {
      return {
        ...prev,
        tickets: data.tickets,
        price: data.price * Number(data.tickets),
        route: data.route,
        minutes: data.minutes,
        dispatch_moscow_time: data.dispatch_moscow_time,
        dispatch_moscow_time_b: data.dispatch_moscow_time_b,
        arrival_time: setTimeArrival(data.minutes, data.dispatch_moscow_time),
        local_dispatch_time: setLocalTimeDispatch(data.dispatch_moscow_time),
        local_dispatch_time_b: setLocalTimeDispatch(data.dispatch_moscow_time_b),
        local_arrival_time: setTimeArrival(data.minutes, setLocalTimeDispatch(data.dispatch_moscow_time)),
      }
    }
    )
  }, [data])

  const handleSetData = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    });
  };

  const handleSetAdditionalData = (additionalData) => {
    const { price, minutes, dispatch_moscow_time } = additionalData;
    setData((prev) => {
      return {
        ...prev,
        price: price,
        minutes: minutes,
        dispatch_moscow_time: dispatch_moscow_time
      }
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(accum);
  };


  return (
    <form className="route" id="route" onSubmit={(e) => handleSubmitForm(e)}>

      {/* Таймер */}
      <div className="container">
        <h3>Местное время:</h3>
        <Moment interval={1000} format="HH:mm:ss" />
      </div>

      {/* Направление */}
      <div className="container">
        <label htmlFor="route">Направление:</label>
        <select name="route" form="route" onChange={(e) => handleSetData(e)} defaultValue={DEFAULT_VALUE.route}>
          {ROUTES && ROUTES.map((route) => (
            <option key={route.id}
              value={route.route}
              onClick={() => {
                if (route.route === returnValueTicket) {
                  setroundTrip(route.times)
                }
                return handleSetAdditionalData({
                  price: route.price,
                  minutes: route.minutes,
                  dispatch_moscow_time: route.route !== returnValueTicket ? route.time[0] : route.times['a'][0],
                })
              }
              }>
              {route.route}</option>
          )
          )}
        </select>
      </div>

      {/* Выбор времени */}
      <div className="container">
        <label htmlFor="dispatch_moscow_time">Выберите время:</label>
        <select name="dispatch_moscow_time" form="route" onChange={(e) => handleSetData(e)} defaultValue={DEFAULT_VALUE.dispatch_moscow_time}>
          {ROUTES && ROUTES.map((route) => {
            if (route.route !== returnValueTicket && data.route === route.route) {
              return route.time.map((time) => <option key={time} value={time}>{setLocalTimeDispatch(time)}</option>)
            }
            if (route.route === returnValueTicket && roundTrip.a && data.route === route.route) {
              return roundTrip.a.map((time) => <option key={time} value={time}>{setLocalTimeDispatch(time)}</option>)
            }
          }
          )}
        </select>
      </div>

      {/* Выбор времени обратного билета */}
      {data.route === returnValueTicket &&
        <div className="container">
          <label htmlFor="dispatch_moscow_time_b">{`Выберите обратный билет: ${returnTicket && !returnTicket.length ? "ВСЁ! ЗАКОНЧИЛИСЬ...Спасибо!" : ""}`}</label>
          <select name="dispatch_moscow_time_b" form="route" onChange={(e) => handleSetData(e)} defaultValue={DEFAULT_VALUE.dispatch_moscow_time_b}>
            {returnTicket && returnTicket.map((time) => (
              <option key={time} value={time}>{setLocalTimeDispatch(time)}</option>
            ))}
          </select>
        </div>
      }

      {/* Количество билетов */}
      <div className="container">
        <label htmlFor="tickets" >Количество билетов:</label>
        <input type="number" form="route" name="tickets" min="0" onChange={(e) => handleSetData(e)} />
        <input disabled={disabledButton} value="Console.log(submitData)" type="submit" form="route" />
      </div>

      {/* Итого если выбор в одну сторону*/}
      <div className="container accum">
        <p>{`Выбрано билетов ${accum.tickets ? accum.tickets : 0} ${accum.route ? accum.route : ""} стоимостью ${accum.price ? accum.price : 0} р.`}</p>
        <p>{`Это путешествие займет у вас ${accum.minutes ? accum.minutes : 0} минут.`}</p>
        <p>{`Отправление из А: ${accum.local_dispatch_time}, Прибытие в В: ${accum.local_arrival_time}.`}</p>

        {/* Обратно в А*/}
        {showTicketA && <p>{`Обратно в А: ${accum.local_dispatch_time_b}.`}</p>}

      </div>

    </form>
  );
}

export default App;