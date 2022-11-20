"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'task-local',
    password: 'Maykradexla2019',
    database: 'task-local',
    entities: [`${__dirname}/**/entities*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations*.{ts,js}`],
});
exports.config = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'task-local',
    password: 'Maykradexla2019',
    database: 'task-local',
    entities: [`${__dirname}/**/entities*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations*.{ts,js}`],
};
