const db = require('../config/db');

class FuelsMedol {
    constructor() {

    }
     
    findAll() {
        const sql = 'select * from fuels';
        return db.query(sql, []);
    }

    findById(id) {
        const sql = 'select * from fuels where fuel_id = ?';
        return db.query(sql, [id]);
    }

    findByName(name) {
        const sql = 'select * from fuels where name = ?';
        return db.query(sql, [name]);
    }

    updateById(body, id) {
        const sql = 'update fuels set ? where fuel_id = ?';
        return db.query(sql, [body, id]);
    }

    deleteById(id) {
        const sql = 'delete from fuels where fuel_id = ?';
        return db.query(sql, [id]);
    }

    create(body) {
        const sql = 'insert into fuels set ?';
        return db.query(sql, [body]);
    }

    createIgnore(body) {
        const sql = 'insert ignore into fuels set ?';
        return db.query(sql, [body]);
    }
}

module.exports = new FuelsMedol();