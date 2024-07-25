import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from "../entities/user";
import Session from "../entities/session";
import {randomUUID} from "node:crypto";

const sessionExpiryTime = 3600 * 1000; // 1 hour
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            const sessionId = randomUUID();
            await Session.create<Session>({ id: sessionId, user_id: user.id, expires_at: new Date(Date.now() + sessionExpiryTime) });
            res.status(200).json({ id: user.id, username: user.username, name: user.name, sessionId: sessionId });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const {username, email, password , name} = req.body;
        // check if user already registered
        if (username && email && password && name) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ id: randomUUID(),username, email, password: hashedPassword , name});
            res.status(201).json({ message: "User registered successfully" });
        } else {
            console.log(username, email, password, name);
            res.status(400).send("Bad request");
        }
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "User registration failed" });
    }
}

export const logout = async (req: Request, res: Response) => {
    res.status(200).json({ message: "User logged out successfully" });
}
