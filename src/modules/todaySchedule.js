const loginToAmizone = require("../utils/login");

const fetchTodayScheduleData = async (credentials) => {
  const { page, browser, blockResourcesPlugin, error } = await loginToAmizone(credentials);
  if(error) {
    return { error };
  }

  blockResourcesPlugin.blockedTypes.delete('script');

  try {
    // await Promise.all([
    //   page.waitForSelector("#email"),
    //   page.waitForSelector("#dlPassword")
    // ]);

    /* Get Data */
    /* Wait for page API response what provides the data */
    const response = await page.waitForResponse((response) => response.url().startsWith("https://student.amizone.net/Calendar/home/GetDiaryEvents") && response.status() === 200);
    const responseData = await response.json();

    const date = responseData[0].start.trim().split(' ')[0];
    const userData = responseData
      .filter((item) => item.start.trim().split(' ')[0] === date)
      .map((item) => {
        return {
          courseTitle: item.title,
          courseCode: item.CourseCode,
          facultyName: item.FacultyName,
          start: item.start,
          end: item.end,
          roomNumber: item.RoomNo,
          attendanceColor: item.AttndColor,
          allDay: item.allDay,
        }
      });

    /* Close puppeteer */
    await browser.close();
    return userData;
  } catch (e) {
    console.log(e);
    return { error: 'Request Timeout.' };
  }
};

module.exports = fetchTodayScheduleData;
