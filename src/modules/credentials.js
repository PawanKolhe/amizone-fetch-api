const loginToAmizone = require("../utils/login");

const fetchCredentialsData = async (credentials) => {
  const { page, browser, blockResourcesPlugin, error } = await loginToAmizone(credentials);
  if(error) {
    return { error };
  }

  try {
    await Promise.all([
      page.waitForSelector("#email"),
      page.waitForSelector("#dlPassword"),
      page.waitForSelector("#dlPass")
    ]);

    /* Get Data */
    const userData = {};

    const emailId = await page.evaluate(() => document.querySelector('#email').value.trim());
    const emailPassword = await page.evaluate(() => document.querySelector('#dlPassword').getAttribute('onclick').match(/(?<=pass\(').*?(?=',)/g)[0].trim());
    userData.amityEmail = { id: emailId, password: emailPassword };

    const opacId = await page.evaluate(() => document.querySelector('#Div_Partial > div.main-content > div.main-content-inner > div.page-content > div > div > div > div:nth-child(7) > div.col-sm-8 > div > div.col-xs-12.col-sm-5.widget-container-col > div > div > div > p:nth-child(1)').childNodes[2].textContent.replace(/\r?\n|\r| /g, ''));
    const opacPassword = await page.evaluate(() => document.querySelector('#dlPass').getAttribute('onclick').match(/(?<=pass\(').*?(?=',)/g)[0].trim());
    userData.opac = { id: opacId, password: opacPassword };

    const teamsId = await page.evaluate(() => document.querySelector('#Div_Partial > div.main-content > div.main-content-inner > div.page-content > div > div > div > div.state-overview > div:nth-child(3) > div > div > span:nth-child(4)').lastChild.textContent.replace(/\r?\n|\r| /g, ''));
    const teamsPassword = await page.evaluate(() => document.querySelector('#Div_Partial > div.main-content > div.main-content-inner > div.page-content > div > div > div > div.state-overview > div:nth-child(3) > div > div > div').childNodes[2].textContent.replace(/\r?\n|\r| /g, ''));
    userData.msTeams = { id: teamsId, password: teamsPassword };

    userData.formNumber = opacId;

    /* Close puppeteer */
    await browser.close();
    return userData;
  } catch (e) {
    console.log(e);
    return { error: 'Request Timeout.' };
  }
};

module.exports = fetchCredentialsData;
