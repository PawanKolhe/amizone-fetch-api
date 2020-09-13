const loginToAmizone = require("../utils/login");

const fetchPhotoData = async (credentials) => {
  const { page, browser, error } = await loginToAmizone(credentials);
  if(error) {
    return { error };
  }

  await page.waitForSelector('.nav-user-photo');
  let photoUrl = await page.evaluate(() => document.querySelector('.nav-user-photo').getAttribute('src'));

  /* Get Data */
  const userData = {};
  userData.photoUrl = photoUrl;

  /* Close puppeteer */
  await browser.close();
  return userData;
};

module.exports = fetchPhotoData;
