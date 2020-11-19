if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const router = require('./routes/index');
const cors = require('cors');
const port = process.env.PORT || 3000;
const errorHandlers = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send({
        message: 'Application running'
    })
})
app.use(router);
app.use(errorHandlers);

app.listen(port, () => {
    console.log(`Application running on port ${port}`);
});

module.exports = app;