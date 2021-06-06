var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api", function (req, res) {
	res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/:date", function (req, res) {
	let dateString = req.params.date;
	//5 digits or more must be a unix time, until we reach a year 10,000
	if (/\d{5,}/.test(dateString)) {
		let dateInteger = parseInt(dateString);
		res.json({ unix: dateInteger, utc: new Date(dateInteger).toUTCString() });
	}
	let dateObj = new Date(dateString);

	dateObj.toString() === "Invalid Date"
		? res.json({ error: "Invalid Date" })
		: res.json({
				unix: parseInt(dateObj.valueOf()),
				utc: dateObj.toUTCString(),
		  });
});

var listener = app.listen(process.env.PORT || 5000, function () {
	console.log("Your app is listening on port " + listener.address().port);
});
