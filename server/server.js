import { config } from 'dotenv';
config();
import express from 'express'
import router from './routes/auth.js'
import privateRouter from './routes/privateRoute.js'
import adminRouter from './routes/adminRoute.js'
import newsLetterRouter from './routes/newsLetter.js'
import errorHandler from './middleware/error.js'
import schedule  from 'node-schedule'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log('ORIGIN', origin)
    res.header('Access-Control-Allow-Origin', `${process.env.CLIENT_URL}`);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
app.use('/api/newsLetter', newsLetterRouter)





//Error Handler Last piece of middleware
app.use(errorHandler)

const PORT = process.env.PORT || 9003

const server =  app.listen(PORT, () => console.log (`server runing on port http://localhost:${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`LOGGED ERROR>>: ${err}`);
    server.close(() => process.exit(1));
})