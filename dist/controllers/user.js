"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
class UserController {
    async subscribeUser(req, res) {
        const fromUserId = req.body;
        const toUserId = req.body;
        const fromUser = await models_1.default.User.findOne({ where: { id: fromUserId } });
        const toUser = await models_1.default.User.findOne({ where: { id: toUserId } });
        if (!fromUser || !toUser) {
            res.status(404).send('User not founded');
        }
        const fromUserSubscription = await models_1.default.Subscription.findOne({ where: { userId: fromUserId } });
        const newSubscription = fromUserSubscription.subscriptions.push(toUser);
        await newSubscription.save();
        const toUserSubscription = await models_1.default.Subscription.findOne({ where: { userId: toUserId } });
        const isFriend = toUserSubscription.subscriptions.includes(fromUser);
        if (isFriend) {
            const fromUserFriendship = await models_1.default.Friends.findOne({ where: { userId: fromUserId } });
            const toUserFriendship = await models_1.default.Friends.findOne({ where: { userId: toUserId } });
            const newFriendForFromUser = await fromUserFriendship.friendships.push(toUser);
            const newFriendForToUser = await toUserFriendship.friendships.push(fromUser);
            await newFriendForFromUser.save();
            await newFriendForToUser.save();
        }
    }
}
exports.default = UserController;
