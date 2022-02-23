const res = require('express/lib/response');
const db = require('../config/db');

class PlantsMedol {
    constructor() {

    }
    
    getPlantNameByName({name_vague, name, name_vague_tail, limit}) {
        let sql = '';
        limit = limit ? limit : 5;
        sql = 'select name'
            + ' from plants '
            + ' where'
            + (name ? ' name=\'' + name + '\' and' : '') 
            + (name_vague ? ' name like \'%' + name_vague + '%\'' + ' and' : '')
            + (name_vague_tail ? ' name like \'' + name_vague_tail + '%\'' + ' and' : '')
            + ' 1'
            + ' group by name' 
            + ' limit ' + limit + ';';
        console.log(sql)
        return db.query(sql, []);
    }

    getCountryNameByName({name_vague, name, name_vague_tail, limit}) {
        let sql = '';
        limit = limit ? limit : 5;
        sql = 'select country'
            + ' from plants '
            + ' where'
            + (name ? ' country=\'' + name + '\' and' : '') 
            + (name_vague ? ' country like \'%' + name_vague + '%\'' + ' and' : '')
            + (name_vague_tail ? ' country like \'' + name_vague_tail + '%\'' + ' and' : '')
            + ' 1'
            + ' group by country' 
            + ' limit ' + limit + ';';
        console.log(sql)
        return db.query(sql, []);
    }

    getFuelNameByName({name_vague, name, name_vague_tail, limit}) {
        let sql = '';
        limit = limit ? limit : 5;
        sql = 'select fuel'
            + ' from plants '
            + ' where'
            + (name ? ' fuel=\'' + name + '\' and' : '') 
            + (name_vague ? ' fuel like \'%' + name_vague + '%\'' + ' and' : '')
            + (name_vague_tail ? ' fuel like \'' + name_vague_tail + '%\'' + ' and' : '')
            + ' 1'
            + ' group by fuel' 
            + ' limit ' + limit + ';';
        console.log(sql)
        return db.query(sql, []);
    }
}

module.exports = new PlantsMedol();