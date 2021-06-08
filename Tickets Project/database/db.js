
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./database/database.json');
const db = low(adapter);

function initDatabase(){
    db.defaults({ event: [], ticket: [],staff: []}).write();
};

exports.initDatabase = initDatabase;
exports.db = db;
