require('dotenv').config()

const app = require("./app");

const port = process.env.PORT || 7000;
app.listen(port);
