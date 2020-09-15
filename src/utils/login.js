// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();

puppeteer.use(blockResourcesPlugin);

/* Block certain resources */
blockResourcesPlugin.blockedTypes.add('image');
blockResourcesPlugin.blockedTypes.add('stylesheet');
blockResourcesPlugin.blockedTypes.add('font');
blockResourcesPlugin.blockedTypes.add('media');
blockResourcesPlugin.blockedTypes.add('script');

const loginToAmizone = async (credentials) => {
  /* Start puppereer and create new page */
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultTimeout(60000);

  try {
    /* Go to Login page and Login with provided username and password */
    // await page.goto("https://student.amizone.net/", { waitUntil: "domcontentloaded" });
    await page.goto("https://student.amizone.net/");

    await page.waitForSelector("#loginform > div.container-login100-form-btn > button");

    await page.evaluate((credentials) => {
      document.querySelector("#loginform > div:nth-child(2) > input").value = credentials.username;
      document.querySelector("#loginform > div:nth-child(3) > input").value = credentials.password;
      document.querySelector("#loginform > div.container-login100-form-btn > button").click();
    }, credentials);

    // /* Wait for home page request */
    // await page.waitForRequest((request) => request.url() === "https://student.amizone.net/Home");

    return { page, browser, blockResourcesPlugin };
  } catch (e) {
    console.log(e);
    return { error: 'Request Timeout.' };
  }
}

module.exports = loginToAmizone;
