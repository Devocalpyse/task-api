import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';

// Database connection:
mongoose.connect(process.env.TEST_DB!).then(
  () => console.log('Database connection successful!'),
  (err) => console.log('Error connecting to the database', err)
);

// App middleware
const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TO-DO: routes, called taskRoutes
app.use('/api/tasks', taskRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).end();
});

app.listen(3000);
