if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const errorHandlers = require("./middlewares/errorHandlers");
const routes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);
app.use(errorHandlers);

// app.listen(PORT, () => console.log(`Server berjalan pada port ${PORT}`)); jgn lupya dinyalain pas mau deploy

module.exports = app;
