import express, { Express } from 'express';
import dotenv from 'dotenv';
import db from './models';
import UserRoutes from './routes/user';
import { userGenerator } from './user-generator';
dotenv.config();

const app: Express = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = process.env.PORT || 8000;

app.use('/api/users/', new UserRoutes().router)

db.sequelize.authenticate().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
})

userGenerator(200);
