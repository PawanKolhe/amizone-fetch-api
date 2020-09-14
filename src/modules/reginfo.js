const loginToAmizone = require("../utils/login");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const extractReginfoData = (html) => {
  /* Create page DOM instance with JSDOM */
  const DOM = new JSDOM(html);

  const table = DOM.window.document.querySelector("#divPrint > table > tbody").children;

  /* Extract data */
  let data = {};
  data.semester = table[2].children[1].innerHTML.trim();
  data.photo = table[2].children[2].firstElementChild.getAttribute('src');
  data.enrollmentno = table[3].children[1].innerHTML.trim();
  data.name = table[4].children[1].innerHTML.trim();
  data.program = table[5].children[1].innerHTML.trim();
  data.batch = table[6].children[1].innerHTML.trim();
  data.dob = table[7].children[1].innerHTML.trim();
  data.email = table[8].children[1].innerHTML.trim();
  data.contactaddress = table[10].children[1].innerHTML.trim().replace(/<br>/g, ' ');
  data.contactpincode = table[11].children[1].innerHTML.trim();
  data.contactphone = table[12].children[1].innerHTML.trim();
  data.contactmobile = table[13].children[1].innerHTML.trim();
  data.fax = table[14].children[1].innerHTML.trim();
  data.fathername = table[16].children[1].innerHTML.trim();
  data.permanentaddress = table[17].children[1].innerHTML.trim().replace(/<br>/g, ' ');
  data.permanentpincode = table[18].children[1].innerHTML.trim();
  data.permanentphone = table[19].children[1].innerHTML.trim();
  data.permanentfax = table[20].children[1].innerHTML.trim();
  data.hostel = table[21].children[1].innerHTML.trim();
  data.homeaddress = table[22].children[1].innerHTML.trim().replace(/<br>/g, ' ');
  data.homecity = table[23].children[1].innerHTML.trim();
  data.homepincode = table[24].children[1].innerHTML.trim();
  data.hometelephone = table[25].children[1].innerHTML.trim();
  data.homemobile = table[26].children[1].innerHTML.trim();
  data.homeemail = table[27].children[1].innerHTML.trim();

  return data;
};

const fetchReginfoData = async (credentials) => {
  const { page, browser, error } = await loginToAmizone(credentials);
  if (error) {
    return { error };
  }

  try {
    /* Navigate to page */
    await page.evaluate(() => document.querySelector("[id='1']").click());

    /* Wait for page API response what provides page HTML */
    const response = await page.waitForResponse((response) => response.url() === "https://student.amizone.net/SemRegistration/ReRegistrationPrint" && response.status() === 200);
    const responseHTML = await response.text();

    /* Get Data */
    const userData = extractReginfoData(responseHTML);

    /* Close puppeteer */
    await browser.close();
    return userData;
  } catch (e) {
    return { error: 'Request Timeout.' };
  }
};

module.exports = fetchReginfoData;
