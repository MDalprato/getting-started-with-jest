const moment = require('moment');
var localLocale = moment();

//TODO: get current locale
localLocale.locale('it');

const timeHelpers = require("../src/timeHelpers");

describe("Input as string, output as a moment date", () => {
  test("It should return a date", () => {
    const stringDate = '20220608100000';
    const outputDateAsDate =   new Date('2022-06-08T10:00:00+0000');
    expect(timeHelpers.serverStringToDate(stringDate)).toEqual(outputDateAsDate);
  });
});

describe("Input as string, output as a cool text date", () => {
  test("It should return a cool text date", () => {
    const stringDate = '20220608100000';
    const outputDateAsDate =   new Date('2022-06-08T10:00:00+0000');
    const displayDate = moment.utc(Math.floor(outputDateAsDate));    
    expect(timeHelpers.serverDateToDisplayDate(stringDate)).toEqual(displayDate);
  });
});


// describe("Input as display date, output as formattedDate", () => {
//   test("It should return a formatted date", () => {

//     const stringDate = '20220608100000';


//     const isLocal = true;
//     const outputDateAsDate =       return (displayDate) ? displayDate.local().format('L') + " " + displayDate.local().format('HH:mm:ss') : '';

//     const displayDate = moment.utc(Math.floor(outputDateAsDate));   

//     expect(timeHelpers.serverDateToDisplayDate(stringDate, isLocal)).toEqual(displayDate);

//     // not local



//   });
// });



