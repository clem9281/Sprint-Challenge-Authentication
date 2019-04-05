const db = require('./dbconfig');

const addUser = user => {
    return db('users').insert(user);
}

const findBy = filter => {
    return db('users').where(filter);
}

module.exports = {
    addUser,
    findBy
}