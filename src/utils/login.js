const puppeteer = require("puppeteer");

const loginToAmizone = async (credentials) => {
  /* Start puppereer and create new page */
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);

  /* Go to Login page and Login with provided username and password */
  await page.goto("https://student.amizone.net/", { waitUntil: "domcontentloaded" });
  await page.evaluate((credentials) => {
    document.querySelector("#loginform > div:nth-child(2) > input").value = credentials.username;
    document.querySelector("#loginform > div:nth-child(3) > input").value = credentials.password;
    document.querySelector("#loginform > div.container-login100-form-btn > button").click();
  }, credentials);

  /* Wait for Home page to load */
  try {
    await page.waitForSelector("#donutchart");
    return { page, browser };
  } catch (e) {
    if (e instanceof puppeteer.errors.TimeoutError) {
      return { error: 'Request Timeout' };
    }
  }
}

module.exports = loginToAmizone;
