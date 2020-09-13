const loginToAmizone = require("../utils/login");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const extractWeeklyScheduleData = (html) => {
  /* Create page DOM instance with JSDOM */
  const DOM = new JSDOM(html);
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let data = {};

  /* Extract data */
  weekdays.forEach((weekday) => {
    const weekdayHtmlList = DOM.window.document.querySelector(`#${weekday} > .row`).children;
    // console.log(weekday, DOM.window.document.body.querySelector(`#Tuesday > .row`).children[0].firstElementChild.innerHTML);
    if(weekdayHtmlList && weekdayHtmlList.length) {
      data[weekday] = [];
      for(let i = 0; i < weekdayHtmlList.length; i++) {
        data[weekday][i] = {};
        const dataItems = weekdayHtmlList[i].firstElementChild.children;
        const timeArr = dataItems[0].innerHTML.split('to');
        data[weekday][i].fromTime = timeArr[0].trim();
        data[weekday][i].toTime = timeArr[1].trim();
        data[weekday][i].courseCode = dataItems[1].innerHTML;
        data[weekday][i].courseTeacher = dataItems[2].innerHTML;
        data[weekday][i].classLocation = dataItems[3].innerHTML;
      }
    }
  });

  return data;
};

const fetchWeeklyScheduleData = async (credentials) => {
  const { page, browser, error } = await loginToAmizone(credentials);
  if(error) {
    return { error };
  }

  /* Navigate to page */
  await page.evaluate(() => document.querySelector("[id='10']").click());

  /* Wait for page API response what provides page HTML */
  const response = await page.waitForResponse((response) => response.url() === "https://student.amizone.net/TimeTable/Home?X-Requested-With=XMLHttpRequest" && response.status() === 200);
  const responseHTML = await response.text();

  /* Get Data */
  const userData = extractWeeklyScheduleData(responseHTML);

  /* Close puppeteer */
  await browser.close();
  return userData;
};

module.exports = fetchWeeklyScheduleData;
