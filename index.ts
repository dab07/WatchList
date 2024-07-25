import express from 'express';
import userRoutes from './src/routes/userRoute';
import cors from 'cors';
const app: express.Application = express();
const port: number = 3000;
import movieRoutes from "./src/routes/movieRoutes";
import Session from './src/entities/session';
import User from './src/entities/user';
import {connectDatabase} from "./src/utils/db";
import {addAssociations} from "./src/utils/associations";
app.use(cors());
app.use(express.json());
// app.use(session({
//     secret: 'your-secret-key', // Replace with a strong secret key
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 24 * 60 * 60 * 1000 // 1 day
//     }
// }));
app.use('/api/users', userRoutes);

app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionId = req.headers['x-session-id'] as string;
        const userId = req.headers['x-user-id'] as string;

        if (!sessionId || !userId) {
            return res.status(401).send('Unauthorized user: Missing session or user id.');
        }

        const existingSession = await Session.findOne({
            where: {
                id: sessionId,
                user_id: userId,
            }
        });

        if (existingSession) {
            console.log(`Session(${sessionId}) verified for user: ${userId}`);
            return next();
        }

        res.status(401).send('Unauthorized user: Invalid session.');
    } catch (error) {
        console.error('Error in session middleware:', error);
        res.status(500).send('Internal server error.');
    }
});


app.use('/api/movies', movieRoutes);

connectDatabase().then(() => {
    addAssociations();
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
