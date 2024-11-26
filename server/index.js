import express from 'express';
import cors from 'cors';
import sequelize from './db.js'
import { Task, TaskStatus } from "./models/models.js"
import router from './routes/index.js'

const PORT = process.env.PORT || 7000;

const app = express();
app.use(express.json());
app.use(cors())
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch(error) {
    console.log(error);
  }
}

start()