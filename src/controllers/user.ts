import db from '../models';
import { Request, Response } from 'express';
import Sequelize from 'sequelize';
import { QueryTypes } from 'sequelize';

export default class UserController {
    async subscribeUser (req: Request, res: Response) {
        const { senderId, receiverId } = req.body;

        const sender = await db.User.findOne({ where: { id: senderId } });
        
        const receiver = await db.User.findOne({ where: { id: receiverId } });

        if (!sender || !receiver) {
            res.status(404).json({ error: 'User not founded' });
        }

        if (senderId == receiverId) {
            res.status(401).json({ error: 'You cannot subscribe yourself' });
        }

        const senderSubscriptions = await db.Subscription.findAll({ where: { senderId: senderId } });

        if (senderSubscriptions.length > 150) {
            res.status(401).json({ error: 'You have 150 subscriptions' });
        }

        const subscription = await db.Subscription.create({ senderId: senderId, receiverId: receiverId });

        const savedSubscription = await subscription.save();

        res.status(200).json(savedSubscription);
    }

    async getCountOfMyFriendsFriends (req: Request, res: Response) {
        const { senderId } = req.query;
        const { receiverId } = req.query;
        
        const sender = await db.User.findOne({ where: { id: senderId } });
        
        const receiver = await db.User.findOne({ where: { id: receiverId } });

        if (!sender || !receiver) {
            res.status(404).send({ message: 'User not founded' });
        }

        const checkingFriendshipForReceiver = await db.Subscription.findOne({ where: { senderId: senderId, receiverId: receiverId } });
        const checkingFriendshipForSender = await db.Subscription.findOne({ where: { senderId: receiverId, receiverId: senderId } });

        if (!checkingFriendshipForReceiver || !checkingFriendshipForSender) {
            res.status(401).json({ message: 'You are not friends' });
        }

        const receiverSubs = await db.Subscription.findAll({ where: { senderId: receiverId } });

        let myFriends = [];

        for (let subs of receiverSubs) {
            const receiverFriends = await db.Subscription.findOne({ where: { senderId: subs.receiverId, receiverId: subs.senderId } });
            myFriends.push(receiverFriends);
        }

        res.status(200).json(myFriends.length);
    }

    async getAllUsers (req: Request, res: Response) {
        const users = await db.User.findAll();
        res.status(200).json(users);            
        }

    async getMyFriends (req: Request, res: Response) {
        const { userId } = req.params;
        const order = req.query.order ? req.query.order: 'ASC';
        const sortBy = req.query.sortBy ? req.query.sortBy: 'id';

        const user = await db.User.findOne({ where: { id: userId } });
  
        if (!user) {
            res.status(404).send({ message: 'User not founded' });
        }

        const userSubs = await db.Subscription.findAll({ where: { senderId: userId } });
 
        userSubs.forEach(async (subs: any) => {
            const usersFriendsFriends = await db.User.findAll({ where:
                { id: subs.receiverId },
                order: [[sortBy, order]],
            });

            res.status(200).json(usersFriendsFriends);
        })
    }

    async getMaxFollowingUsers (req: Request, res: Response) {
        const attributes = ['senderId',[Sequelize.fn('Count', Sequelize.col('senderId')), 'count']];
        const maxFollowingUsers = await db.Subscription.findAll({
            attributes: attributes,
            order:[['count','desc']],
            limit: 5,
            group: ['senderId'],
        });

        res.status(200).json(maxFollowingUsers);
    }

    async getNotFollowingUsers (req: Request, res: Response) {
        const notFollowing = await db.sequelize.query(
            `select public."Users".id, public."Users".firstname, public."Users".gender, public."Subscriptions"."senderId" from 
            public."Users" left join public."Subscriptions" on public."Users".id = public."Subscriptions"."senderId" 
            where public."Subscriptions"."senderId" is NULL`,
            {
              replacements: { status: 'active' },
              type: QueryTypes.SELECT
            }
        );

        res.status(200).json(notFollowing);
    }
}