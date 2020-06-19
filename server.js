const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes");
const path = require('path');

//instantiate
const app = express();

//connect to db
connectDB();

//body-parser
app.use(express.json({ extended: false }));

//routes
app.use("/api", routes);

app.set('port', process.env.PORT || 5000);
console.log("++++++++++++++++" + app.get('port'));
app.use(express.static('./client/build'));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build",     
    "index.html"));
 });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

module.exports = app;

app.listen(app.get('port'), function () {
    console.log('Express server listening on port' + app.get('port'));
});