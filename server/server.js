import { config } from 'dotenv';
config();
import express from 'express'
import router from './routes/auth.js'
import privateRouter from './routes/privateRoute.js'
import adminRouter from './routes/adminRoute.js'
import errorHandler from './middleware/error.js'
import schedule  from 'node-schedule'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${process.env.CLIENT_URL}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });
  
  const corsOptions = {
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
};

app.use(cors(corsOptions));


/**HTTP get request */
app.get('/', (req, res) => {
    res.status(201).json('Home GET Request')
})

//Import DB
import './config/db.js'
import UserModel from './models/User.js';

app.use('/api/auth', router)
app.use('/api', privateRouter)
app.use('/api/admin', adminRouter)


//Scheduler to run every 10 mintues
const rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, 2); // This task runs every 10 minutes

// Schedule the task
const task = schedule.scheduleJob(rule, async () => {

  try {
    const users = await UserModel.find()

    console.log('Total number of users.', users.length);
  } catch (error) {
    console.error('Error get all users:', error);
  }
});

//Error Handler Last piece of middleware
app.use(errorHandler)

const PORT = process.env.PORT || 9003

const server =  app.listen(PORT, () => console.log (`server runing on port http://localhost:${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`LOGGED ERROR>>: ${err}`);
    server.close(() => process.exit(1));
})