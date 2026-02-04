const  {toDate } = require('date-fns-tz')


const currentTimeStamp = () => {

  const currentDateIndia = toDate(new Date(), { timeZone: 'Asia/Kolkata' });

  let currentTimeStampIndia = currentDateIndia.getTime();
  currentTimeStampIndia += (5.5 * 60 * 60 * 1000);
  return currentTimeStampIndia
}

const  getCurrentDateTimeStamp = () => {
  const date = new Date(currentTimeStamp());

  // Get the start of the day (00:00:00)
  const minTimestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  return minTimestamp
}
module.exports={currentTimeStamp,getCurrentDateTimeStamp}