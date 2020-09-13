const fetchCoursesData = require("./modules/courses");
const fetchPhotoData = require("./modules/photo");
const fetchReginfoData = require("./modules/reginfo");
const fetchWeeklyScheduleData = require("./modules/weeklyschedule");

const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

/* Express Middleware */
app.use(express.json());

app.post('/courses', async (req, res) => {
  const userData = await fetchCoursesData({
    username: req.body.username,
    password: req.body.password,
  });
  if(userData.error) {
    res.status(408).json({
      error: userData.error
    });
  } else {
    res.json(userData);
  }
});

app.post('/photo', async (req, res) => {
  const userData = await fetchPhotoData({
    username: req.body.username,
    password: req.body.password,
  });
  if(userData.error) {
    res.status(408).json({
      error: userData.error
    });
  } else {
    res.json(userData);
  }
});

app.post('/reginfo', async (req, res) => {
  const userData = await fetchReginfoData({
    username: req.body.username,
    password: req.body.password,
  });
  if(userData.error) {
    res.status(408).json({
      error: userData.error
    });
  } else {
    res.json(userData);
  }
});

app.post('/weeklyschedule', async (req, res) => {
  const userData = await fetchWeeklyScheduleData({
    username: req.body.username,
    password: req.body.password,
  });
  if(userData.error) {
    res.status(408).json({
      error: userData.error
    });
  } else {
    res.json(userData);
  }
});

app.listen(port, () => console.log(`Running on port ${port}`))
