const mysql = require('mysql');
const dbConfig = require('./db.config');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'power_plant',
    dateStrings: true,
});

module.exports = {
    query(sql, params) {
        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err, results, fields) => {
                if (err) {
                    console.log('database operation failed');
                    reject(err);
                }
                resolve({
                    results,
                    fields
                })
            })
        })
    },
    initDB() {
        return new Promise(async (resolve, reject) => {
            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root',
            });
            connection.connect(err => {
                if (err) {
                    console.log('connection to database failed');
                    reject(err);
                }
                console.log('succesfully connect to database');
            })

            var sqls = [
                "CREATE DATABASE if not exists power_plant;",
                "use power_plant;",
                "CREATE TABLE IF NOT EXISTS `plants` ( \
                    `plant_id` INT(11) NOT NULL AUTO_INCREMENT, \
                    `name` VARCHAR(255) NOT NULL,    \
                    `country` VARCHAR(255) NOT NULL, \
                    `latitude` DECIMAL(11, 6) NOT NULL,  \
                    `longitude` DECIMAL(11, 6) NOT NULL, \
                    `date_of_construction` INT(11) default NULL, \
                    PRIMARY KEY (`plant_id`),   \
                    UNIQUE INDEX `plant_id_UNIQUE` (`plant_id` ASC) VISIBLE) \
                ENGINE = InnoDB \
                DEFAULT CHARACTER SET = utf8; ",

                "CREATE TABLE IF NOT EXISTS `fuels` ( \
                    `fuel_id` INT(11) NOT NULL AUTO_INCREMENT, \
                    `name` VARCHAR(255) NOT NULL, \
                    PRIMARY KEY (`fuel_id`), \
                    UNIQUE(name), \
                    UNIQUE INDEX `fuel_id_UNIQUE` (`fuel_id` ASC) VISIBLE) \
                ENGINE = InnoDB \
                DEFAULT CHARACTER SET = utf8;",

                "CREATE TABLE IF NOT EXISTS `plant_fuels` ( \
                    `plant_id` INT(11) NOT NULL, \
                    `fuel_id` INT(11) NOT NULL, \
                    INDEX `plant_id_idx` (`plant_id` ASC) VISIBLE, \
                    INDEX `fuel_id_idx` (`fuel_id` ASC) VISIBLE, \
                    CONSTRAINT `plant_id` \
                        FOREIGN KEY (`plant_id`) \
                        REFERENCES `plants` (`plant_id`) \
                        ON DELETE CASCADE  \
                        ON UPDATE CASCADE , \
                    CONSTRAINT `fuel_id` \
                        FOREIGN KEY (`fuel_id`) \
                        REFERENCES `fuels` (`fuel_id`) \
                        ON DELETE CASCADE  \
                        ON UPDATE CASCADE ) \
                  ENGINE = InnoDB \
                  DEFAULT CHARACTER SET = utf8;" ,

                "CREATE TABLE IF NOT EXISTS `generations` ( \
                    `generation_id` INT(11) NOT NULL AUTO_INCREMENT, \
                    `plant_id` INT(11) NOT NULL, \
                    `year` INT(11) NOT NULL, \
                    `generation` FLOAT(11) NOT NULL, \
                    UNIQUE(year, plant_id), \
                    PRIMARY KEY (`generation_id`), \
                    INDEX `plant_id_idx1` (`plant_id` ASC) VISIBLE, \
                    CONSTRAINT `plant_id1` \
                        FOREIGN KEY (`plant_id`) \
                        REFERENCES `plants` (`plant_id`) \
                        ON DELETE CASCADE  \
                        ON UPDATE CASCADE) \
                  ENGINE = InnoDB \
                  DEFAULT CHARACTER SET = utf8;" ,
            ]
            for (const sql of sqls) {
                connection.query(sql, (err, results, fields) => {
                    if (err) {
                        console.log('database operation failed');
                        reject(err);
                    }
                    resolve({
                        results,
                        fields
                    })
                })
            }
            connection.end(err => {
                if (err) {
                    console.log('failed to close database');
                    reject(err);
                }
                console.log('succesfully initialize database');
                console.log('succesfully close database');
            })
        })
    },
}
