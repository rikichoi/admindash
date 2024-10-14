import { RequestHandler } from "express";
import User from "../models/user";

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        // throw Error("There was an error!!!!")
        const users = await User.find().exec();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const getUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId).exec();

        res.status(200).json(user);
    }
    catch (error) {
        next(error)
    }

}

export const createUser: RequestHandler = async (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const passwordHashed = req.body.passwordHashed;

    try {

        const newUser = await User.create({
            email: email,
            username: username,
            passwordHashed: passwordHashed,
        });

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};