
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from "./routes/user.js";
import dataRouter from "./routes/data.js";
import deviceRouter from "./routes/device.js";
import deviceSetRouter from "./routes/deviceSet.js";


dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/user", userRouter);
app.use("/data", dataRouter);
app.use("/device", deviceRouter);
app.use("/set", deviceSetRouter);

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);