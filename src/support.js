import moment from 'moment';
import tz from 'moment-timezone';

export const setLocalTimeDispatch = (dispatchTime) => {
    const moscowTime = moment().tz("Europe/Moscow").format("HH:mm");
    const localTime = moment().utc(3).format("HH:mm");
    const timeDifference = moment.duration(moscowTime) - moment.duration(localTime)
    return moment.utc(moment.duration(dispatchTime) - moment.duration(timeDifference)).format('HH:mm');
  };
  
  export const setTimeArrival = (minutes, localTimeDispatch) => {
    const arrivalTime = moment.utc().startOf('day').add(minutes, 'minutes').format('HH:mm')
    return moment.utc(moment.duration(arrivalTime) + moment.duration(localTimeDispatch)).format('HH:mm');
  }

  export const setReturnTicketTimes = (roundTrip, arrivalTime) => {
    return roundTrip && roundTrip.reduce((acc, time) => {
      if (moment(moment(arrivalTime, 'HH:mm')).isBefore(moment(time, 'HH:mm'))) {
        acc.push(time)
      }
     return acc
    },[])
  }
  