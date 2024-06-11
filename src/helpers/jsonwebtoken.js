const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, '../../.env')});

const CreateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
};

const VerifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    CreateToken,
    VerifyToken
};