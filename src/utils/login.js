const puppeteer = require("puppeteer");

const loginToAmizone = async (credentials) => {
  /* Start puppereer and create new page */
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(120000);

  try {
    /* Go to Login page and Login with provided username and password */
    await page.goto("https://student.amizone.net/", { waitUntil: "domcontentloaded" });
    await page.evaluate((credentials) => {
      document.querySelector("#loginform > div:nth-child(2) > input").value = credentials.username;
      document.querySelector("#loginform > div:nth-child(3) > input").value = credentials.password;
      document.querySelector("#loginform > div.container-login100-form-btn > button").click();
    }, credentials);

    /* Wait for home page request */
    // await page.waitForRequest((request) => request.url() === "https://student.amizone.net/Home", { timeout: 20000 });

    /* Wait for Home page to load */
    await page.waitForSelector("#donutchart");
    return { page, browser };
  } catch (e) {
    return { error: 'Request Timeout.' };
  }
}

module.exports = loginToAmizone;
