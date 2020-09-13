const extractCoursesData = require("./extract/courses");

const puppeteer = require("puppeteer");

/* PUPPETEER */
const fetchAmizoneUserData = async (credentials) => {
  let userData = {};

  /* Start puppereer and create new page */
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);

  /* Go to page */
  await page.goto("https://student.amizone.net/", {
    waitUntil: "domcontentloaded",
  });

  /* Login using provided username and password */
  await page.evaluate((credentials) => {
    document.querySelector("#loginform > div:nth-child(2) > input").value = credentials.username;
    document.querySelector("#loginform > div:nth-child(3) > input").value = credentials.password;
    document.querySelector("#loginform > div.container-login100-form-btn > button").click();
  }, credentials);

  /* Wait for Home page load */
  try {
    await page.waitForSelector("#donutchart");
  } catch (e) {
    if (e instanceof puppeteer.errors.TimeoutError) {
      return {
        error: 'Request Timeout'
      };
    }
  }

  /* Get the current browser page session */
  // let currentCookies = await page.cookies();

  /* Navigate to Courses page */
  await page.evaluate(() => {
    document.querySelector("[id='18']").click();
  });

  /* Wait for Courses page API response what provides page HTML */
  const courseResponse = await page.waitForResponse((response) => response.url() === "https://student.amizone.net/Academics/MyCourses?X-Requested-With=XMLHttpRequest" && response.status() === 200);
  const courseResponseHTML = await courseResponse.text();

  /* Get Courses Data */
  userData.courses = extractCoursesData(courseResponseHTML);

  /* Close puppeteer */
  await browser.close();

  // console.log(userData);
  return userData;
};

module.exports = fetchAmizoneUserData;
