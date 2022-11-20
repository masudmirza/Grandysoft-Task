import db from './models';
import fetch from 'node-fetch';

export const userGenerator = async (count: number) => {
    const url: string = `https://randomuser.me/api/?results=${count}`;
    const data = await fetch(url);
    const users: any = await data.json();
    users.results.map(async (user: any) => {
        const newUsers = await db.User.create({ firstname: user.name.first, gender: user.gender });
        await newUsers.save();
    });
}

