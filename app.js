
const express = require('express');
const connection = require('./config/db');
const app = express();
const PORT = 3000;
const router = require('./routers/index');
app.get('/', function (req, res) {
    res.send('Test');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


