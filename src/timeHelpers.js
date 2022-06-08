const moment = require('moment');
var localLocale = moment();

//TODO: get current locale
localLocale.locale('it');

function serverStringToDate(serverDate) {
  let convertedDate = (serverDate) ? new Date(serverDate.toString().replace(
    /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
    '$1/$2/$3 $4:$5:$6+0000'
  )) : '';

  return convertedDate;
}


function serverDateToDisplayDate(serverDate) {

  let convertedDate = serverStringToDate(serverDate);
  let displayDate = moment.utc(Math.floor(convertedDate));

  return displayDate;

}

function displayDateToFormattedDate(displayDate, toLocal = false) {

  if (toLocal) {
    return (displayDate) ? displayDate.local().format('L') + " " + displayDate.local().format('HH:mm:ss') : '';
  }

  return (displayDate) ? displayDate.format('L') + " " + displayDate.format('HH:mm:ss') : '';
}

module.exports = function serverDateToFormattedDate(serverDate, toLocal = false) {
  if (!serverDate) return '';

  return displayDateToFormattedDate(serverDateToDisplayDate(serverDate), toLocal);

}

module.exports = function jsDateToArtecoTime(jsDate) {
  try {
    jsDate.toISOString()
  } catch (error) {
    console.error(error);
  }

  const date = jsDate.toISOString().split('T')[0].replace(/-/g, '');
  const time = jsDate.toTimeString().split(' ')[0].replace(/:/g, '');
  return `${date}${time}`
}

function addDays(serverDate, days) {
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

  let convertedDate = serverStringToDate(serverDate);

  return jsDateToArtecoTime(convertedDate.addDays(days))
}

module.exports = function getCurrentServerTime() {
  return moment.utc(new Date()).format('YYYYMMDDHHmmss');
}

function addHours(serverDate, hours) {
  let time = moment.duration(`${Math.abs(hours).toString().padStart(2, '0')}:00:00`);
  let serverDateJs = serverStringToDate(serverDate);
  let dateMoment = moment.utc(serverDateJs);

  let newDate = (hours < 0) ? dateMoment.subtract(time) : dateMoment.add(time);

  let serverNewDate = newDate.format('YYYYMMDDHHmmss');

  return serverNewDate;
}


function intervalOperations(serverDate, duration, operation) {
  let time = moment.duration(duration);
  let serverDateJs = serverStringToDate(serverDate);
  let dateMoment = moment.utc(serverDateJs);

  let newDate = (operation === 'add') ? dateMoment.add(time) : dateMoment.subtract(time);

  let serverNewDate = newDate.format('YYYYMMDDHHmmss');

  return serverNewDate;
}

module.exports = function addInterval(serverDate, duration) {
  return intervalOperations(serverDate, duration, 'add');
}

function subtractInterval(serverDate, duration) {
  return intervalOperations(serverDate, duration, 'subtract');
}

module.exports = {
  serverStringToDate,
  serverDateToDisplayDate,
};

