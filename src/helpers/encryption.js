const bcrypt = require('bcrypt');

const HashPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
};

const ComparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};

module.exports = {
    HashPassword,
    ComparePassword
};