const loginToAmizone = require("../utils/login");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const extractGradesData = (html) => {
  /* Create page DOM instance with JSDOM */
  const DOM = new JSDOM(html);

  const semesterElements = DOM.window.document.querySelectorAll('[data-title="Semester"]');
  const SGPAElements = DOM.window.document.querySelectorAll('[data-title="SGPA"]');
  const CGPAElements = DOM.window.document.querySelectorAll('[data-title="CGPA"]');
  const backPapersElements = DOM.window.document.querySelectorAll('[data-title="Back Papers"]');

  /* Extract data */
  let data = [];
  for(let i = 0; i < semesterElements.length; i++) {
    data.push({});
    data[i].semester = semesterElements[i].innerHTML.trim().replace('&nbsp;', '');
    data[i].sgpa = SGPAElements[i].innerHTML.trim().replace('&nbsp;', '');
    data[i].cgpa = CGPAElements[i].innerHTML.trim().replace('&nbsp;', '');
    data[i].backPapers = backPapersElements[i].innerHTML.trim().replace('&nbsp;', '');
  }

  return data;
};

const fetchGradesData = async (credentials) => {
  const { page, browser, blockResourcesPlugin, error } = await loginToAmizone(credentials);
  if(error) {
    return { error };
  }

  try {
    await page.waitForSelector("[id='21']");

    /* Navigate to page */
    await page.evaluate(() => document.querySelector("[id='21']").click());

    /* Wait for page API response what provides page HTML */
    const response = await page.waitForResponse((response) => response.url().startsWith("https://student.amizone.net/Examination/Examination") && response.status() === 200);
    const responseHTML = await response.text();

    /* Get Data */
    const userData = extractGradesData(responseHTML);

    /* Close puppeteer */
    await browser.close();
    return userData;
  } catch (e) {
    console.log(e);
    return { error: 'Request Timeout.' };
  }
};

module.exports = fetchGradesData;
