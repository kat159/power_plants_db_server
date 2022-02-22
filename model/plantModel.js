const res = require('express/lib/response');
const db = require('../config/db');

class PlantsMedol {
    constructor() {

    }
    
    getNameByName({name_vague, name, name_vague_tail, limit}) {
        console.log(222222);
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

    findAll({name_vague, name, name_vague_tail, country, latitude, latitude_upper, latitude_lower, longitude, longitude_upper, longitude_lower, date_of_construction, date_of_construction_upper, date_of_construction_lower, fuel, limit}) {
        let sql = '';
        limit = limit ? limit : 100;
        if (fuel) {
            // select the plants having the specific fuel and satisfying other filter first, than group_concat all the fuels of each plants
            sql = 'select p.plant_id, p.name, p.country, p.latitude, p.longitude, p.date_of_construction, group_concat(f.name) as fuels'
            + ' from plants p '
            + ' inner join plant_fuels pf using(plant_id)'
            + ' inner join fuels f using(fuel_id)'
            + ' where p.plant_id in('
                + ' select p.plant_id '
                + ' from plants p'
                + ' inner join plant_fuels pf using(plant_id)'
                + ' inner join fuels f using(fuel_id)'
                + ' where'
                + (name ? ' p.name=\'' + name + '\' and' : '') 
                + (name_vague ? ' p.name like \'%' + name_vague + '%\'' + ' and' : '')
                + (name_vague_tail ? ' p.name like \'' + name_vague_tail + '%\'' + ' and' : '')
                + (country ? ' p.country=\'' + country + '\'  and' : '' )
                + (latitude ? ' p.latitude=' + latitude + ' and' : '') 
                + (latitude_upper ? ' p.latitude<=' + latitude_upper + ' and' : '')
                + (latitude_lower ? ' p.latitude>=' + latitude_lower + ' and' : '')
                + (longitude ? ' p.longitude=' + longitude + ' and' : '') 
                + (longitude_upper ? ' p.longitude<=' + longitude_upper + ' and' : '')
                + (longitude_lower ? ' p.longitude>=' + longitude_lower + ' and' : '')
                + (date_of_construction ? ' p.date_of_construction=' + date_of_construction + ' and' : '')
                + (date_of_construction_upper ? ' p.date_of_construction<=' + date_of_construction_upper + ' and' : '')
                + (date_of_construction_lower ? ' p.date_of_construction>=' + date_of_construction_lower + ' and' : '')
                + (fuel ? ' f.name=\'' + fuel + '\'' + ' and' : '')
                + ' 1'
                + ' group by p.plant_id)' 
            + ' group by p.plant_id'
            + ' limit ' + limit;
        } else {
            sql = 'select p.plant_id as plant_id, p.name as name, p.country as country, p.latitude as latitude, p.longitude as longitude, p.date_of_construction as date_of_construction, group_concat(f.name) as fuels'
            + ' from plants p'
            + ' inner join plant_fuels pf using(plant_id)'
            + ' inner join fuels f using(fuel_id)'
            + ' where'
            + (name ? ' p.name=\'' + name + '\' and' : '') 
            + (name_vague ? ' p.name like \'%' + name_vague + '%\'' + ' and' : '')
            + (name_vague_tail ? ' p.name like \'' + name_vague_tail + '%\'' + ' and' : '')
            + (country ? ' p.country=\'' + country + '\'  and' : '' )
            + (latitude ? ' p.latitude=' + latitude + ' and' : '') 
            + (latitude_upper ? ' p.latitude<=' + latitude_upper + ' and' : '')
            + (latitude_lower ? ' p.latitude>=' + latitude_lower + ' and' : '')
            + (longitude ? ' p.longitude=' + longitude + ' and' : '') 
            + (longitude_upper ? ' p.longitude<=' + longitude_upper + ' and' : '')
            + (longitude_lower ? ' p.longitude>=' + longitude_lower + ' and' : '')
            + (date_of_construction ? ' p.date_of_construction=' + date_of_construction + ' and' : '')
            + (date_of_construction_upper ? ' p.date_of_construction<=' + date_of_construction_upper + ' and' : '')
            + (date_of_construction_lower ? ' p.date_of_construction>=' + date_of_construction_lower + ' and' : '')
            + (fuel ? ' f.name=\'' + fuel + '\'' + ' and' : '')
            + ' 1'
            + ' group by p.plant_id' 
            + ' limit ' + (limit ? limit : 100);
        }
        console.log(sql)
        return db.query(sql, []);
    }

    findById(id) {
        const sql = 'select * from plants where plant_id = ?';
        return db.query(sql, [id]);
    }

    findByName(name) {
        const sql = 'select * from plants where name = ?';
        return db.query(sql, [name]);
    }

    updateById(body, id) {
        const sql = 'update plants set ? where plant_id = ?';
        return db.query(sql, [body, id]);
    }

    deleteById(id) {
        const sql = 'delete from plants where plant_id = ?';
        return db.query(sql, [id]);
    }

    create(body) {
        const sql = 'insert into plants set ?';
        const res = db.query(sql, [body]);
        return res;
    }
}

module.exports = new PlantsMedol();