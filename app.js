const express = require('express');
const cors = require('cors');
const ErrorHandler = require('./src/middlewares/ErrorHandler.js')
const router = require('./src/routes/index.js');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(ErrorHandler);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});