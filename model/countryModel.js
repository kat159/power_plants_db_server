const db = require('../config/db');

class FuelsMedol {
    constructor() {

    }
     
    find({name, name_tail_vague, limit}) {
        limit = limit === undefined ? 5 : limit
        const sql = 'select country from plants where'
        + (name_tail_vague ? ' name like \'' + name_tail_vague + '%' : '')
        + ' 1'
        ;
        return db.query(sql, []);
    }
}

module.exports = new FuelsMedol();