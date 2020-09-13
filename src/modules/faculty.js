const loginToAmizone = require("../utils/login");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const extractFacultyData = (html) => {
  /* Create page DOM instance with JSDOM */
  const DOM = new JSDOM(html);

  const timeline = DOM.window.document.querySelector(".timeline").children;
  console.log('AA', timeline);

  /* Extract data */
  let data = [];
  for(let i = 0; i < timeline.length; i++) {
    data.push({});
    const dataElement = timeline[i].lastElementChild;
    console.log('BB', dataElement.innerHTML);
    data[i].subjectShort = timeline[i].firstElementChild.innerHTML.replace(/&amp;/g, '&');
    data[i].subject = dataElement.querySelector('.subject > h4') ? dataElement.querySelector('.subject > h4').innerHTML.replace(/&amp;/g, '&') : '';
    data[i].facultyPhoto = dataElement.querySelector('.circle-image > img') ? dataElement.querySelector('.circle-image > img').getAttribute('src') : '';
    data[i].name = dataElement.querySelector('.faculty-name') ? dataElement.querySelector('.faculty-name').innerHTML : '';
  }

  return data;
};

const fetchFacultyData = async (credentials) => {
  const { page, browser, error } = await loginToAmizone(credentials);
  if(error) {
    return { error };
  }

  /* Navigate to page */
  await page.evaluate(() => document.querySelector("[id='27']").click());

  /* Wait for page API response what provides page HTML */
  const response = await page.waitForResponse((response) => response.url() === "https://student.amizone.net/FacultyFeeback/FacultyFeedback?X-Requested-With=XMLHttpRequest" && response.status() === 200);
  const responseHTML = await response.text();

  /* Get Data */
  const userData = extractFacultyData(responseHTML);

  /* Close puppeteer */
  await browser.close();
  return userData;
};

module.exports = fetchFacultyData;
