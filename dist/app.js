"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = __importDefault(require("./models"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('rgearg');
});
models_1.default.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
// app.listen(port, async () => {
//     console.log(`Server is running on http://localhost:${port}`);
//     await sequelize.authenticate();
//     console.log('db runned')
// })
// const userGenerator = async (count: number) => {
//     const url: string = `https://randomuser.me/api/?results=${count}`;
//     const data = await fetch(url);
//     const jsonData: any = await data.json();
//     const users = jsonData.results.forEach((user: any) => {
//         console.log(user);
//         console.log(user.name.first);
//         console.log(user.gender);
//     });
// }
// user.map( async (user: any) => {
//     const newUsers = await db.User.create({ firstname: user.name.first, gender: user.gender });
//     await db.User.save(newUsers);
// })
// AppDataSource.initialize().then(() => {
//     console.log('DB connected successfully');
// }).catch((err) => console.log('Database connecting error ', err));
// console.log(db);
