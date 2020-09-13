const fetchAmizoneUserData = require("./app");

const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

/* Middleware */
app.use(express.json());

app.post('/courses', async (req, res) => {
  const userData = await fetchAmizoneUserData({
    username: req.body.username,
    password: req.body.password,
  });
  if(userData.error) {
    res.status(401).json({
      error: userData.error
    });
  } else {
    res.json(userData);
  }
});

app.listen(port, () => console.log(`Running on port ${port}`))
