// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const isNumber = (numberInString) => !isNaN(Number(numberInString));

// get parsed data
app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  if (new Date(date).getTime() === null) {
    const parsedDate = new Date(isNumber(date) ? Number(date) : date);
    return res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString(),
    });
  }
  return res.json({ error: "Invalid Date" });
});

app.get("/api/", (req, res) => {
  const parsedDate = new Date();
  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(/* process.env.PORT */ 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
