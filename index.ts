import express from 'express';
// import session from "express-session";
import userRoutes from './src/routes/userRoute';
const app: express.Application = express();
const port: number = 3000;
import {sequelize} from './src/utils/db';
import movieRoutes from "./src/routes/movieRoutes";

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
app.use('/api/movies', movieRoutes);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send('Not Found (index.ts)');
});

sequelize.authenticate().then(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
