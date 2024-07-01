import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from "../entities/user";
import Session from "../entities/session";
import {randomUUID} from "node:crypto";

export const login = async (req: Request, res: Response) => {
    const { username, password , name} = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            res.status(200).json({ message: "User logged in successfully", userId: user.id, username: user.username , name : user.name});
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
        const { username, email, password } = req.body;
        if (username && email && password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ id: randomUUID(),username, email, password: hashedPassword });
            res.status(201).json({ message: "User registered successfully" });
        } else {
            console.log(username, email, password);
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
