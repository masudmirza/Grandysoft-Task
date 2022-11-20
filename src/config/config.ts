require('dotenv').config;

module.exports = {
  "development": {
    "username": 'task_local',
    "password": 'task-local',
    "database": 'task-local',
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
}
