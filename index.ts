import express from 'express';
import userRoutes from './src/routes/userRoute';
const app: express.Application = express();
const port: number = 3000;
import {sequelize} from './src/utils/db';

app.use(express.json());

app.use('/api/users', userRoutes);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send('Not Found');
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
