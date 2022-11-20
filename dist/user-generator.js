"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("./models"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const userGenerator = async (count) => {
    const url = `https://randomuser.me/api/?results=${count}`;
    const data = await (0, node_fetch_1.default)(url);
    const jsonData = await data.json();
    const users = jsonData.results.map(async (user) => {
        // console.log(user);
        // console.log(user.name.first);
        // console.log(user.gender);
        const newUsers = await models_1.default.User.create({ firstname: user.name.first, gender: user.gender });
        await newUsers.save();
    });
};
userGenerator(200);
