const db = require('../config/db');

class GenerationsMedol {
    constructor() {

    } 
     
    findAll() {
        const sql = 'select * from generations';
        return db.query(sql, []);
    }

    findById(id) {
        const sql = 'select * from generations where generation_id = ?';
        return db.query(sql, [id]);
    }

    findByName(name) {
        const sql = 'select * from generations where name = ?';
        return db.query(sql, [name]);
    }

    updateById(body, id) {
        const sql = 'update generations set ? where generation_id = ?';
        return db.query(sql, [body, id]);
    }

    deleteById(id) {
        const sql = 'delete from generations where generation_id = ?';
        return db.query(sql, [id]);
    }

    create(body) {
        const sql = 'insert into generations set ?';
        return db.query(sql, [body]);
    }
}

module.exports = new GenerationsMedol();