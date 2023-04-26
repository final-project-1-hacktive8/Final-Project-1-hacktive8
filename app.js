
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
// const env = require.env.NODE_ENV || 'development';
const router = require('./routers/index');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


module.exports = app;