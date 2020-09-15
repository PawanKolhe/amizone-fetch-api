const loginToAmizone = require("../utils/login");

const fetchPhotoData = async (credentials) => {
  const { page, browser, blockResourcesPlugin, error } = await loginToAmizone(credentials);
  if(error) {
    return { error };
  }

  try {
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    /* Get Data */
    const photoUrl = await page.evaluate(() => document.body.innerHTML.match(/(?<=imageUrl = ').*?(?=';)/)[0]);
    const userData = { photoUrl };

    /* Close puppeteer */
    await browser.close();
    return userData;
  } catch (e) {
    console.log(e);
    return { error: 'Request Timeout.' };
  }
};

module.exports = fetchPhotoData;
