import express from 'express';
import { router } from './routes/route.js';

const app = express()

app.use(router)

app.listen(3550, () => console.log('Running...'))