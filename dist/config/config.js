"use strict";
require('dotenv').config;
module.exports = {
    "development": {
        "username": "task-local",
        "password": "Maykradexla2019",
        "database": "task-local",
        "host": "localhost",
        "dialect": "postgres",
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};
