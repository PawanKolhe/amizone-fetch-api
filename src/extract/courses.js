const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const extractCoursesData = (html) => {
  /* Create Courses page DOM instance with JSDOM */
  const coursesDOM = new JSDOM(html);

  /* Extract Courses data */
  let courses = [];
  coursesDOM.window.document
    .querySelectorAll("#no-more-tables > table [data-title='Course Code']")
    .forEach((ele, i) => {
      courses.push({});
      courses[i].code = ele.innerHTML;
    });
  coursesDOM.window.document
    .querySelectorAll("#no-more-tables > table [data-title='Course Name']")
    .forEach((ele, i) => {
      courses[i].name = ele.innerHTML;
    });
  coursesDOM.window.document
    .querySelectorAll("#no-more-tables > table [data-title='Type']")
    .forEach((ele, i) => {
      courses[i].type = ele.innerHTML;
    });
  coursesDOM.window.document
    .querySelectorAll(
      "#no-more-tables > table [data-title='Attendance'] > button > i"
    )
    .forEach((ele, i) => {
      courses[i].attendance = ele.innerHTML;
    });
  courses = courses.map((course) => {
    const str = course.attendance.trim();
    strArr = str.split(" ");
    strArr2 = strArr[0].split("/");
    course.attendance = {};
    course.attendance.attended = parseInt(strArr2[0]);
    course.attendance.total = parseInt(strArr2[1]);
    course.attendance.unattended =
      course.attendance.total - course.attendance.attended;
    course.attendance.percent = parseFloat(
      strArr[1].substring(1, strArr[1].length - 1)
    );
    return course;
  });

  return courses;
};

module.exports = extractCoursesData;
