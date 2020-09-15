const loginToAmizone = require("../utils/login");

const fetchPhotoData = async (credentials) => {
  const { page, browser, blockResourcesPlugin, error } = await loginToAmizone(credentials);
  if(error) {
    return { error };
  }

  blockResourcesPlugin.blockedTypes.delete('image');

  try {
    await Promise.all([
      page.waitForSelector("#donutchart"),
      page.waitForSelector('.nav-user-photo')
    ]);    

    /* Get Data */
    const photoUrl = await page.evaluate(() => document.querySelector('.nav-user-photo').getAttribute('src'));
    const userData = { photoUrl };

    /* Close puppeteer */
    await browser.close();
    return userData;
  } catch (e) {
    return { error: 'Request Timeout.' };
  }
};

module.exports = fetchPhotoData;
