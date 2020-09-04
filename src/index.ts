import * as dotenv from "dotenv";
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

dotenv.config({ path: __dirname+'../.env' });

app.listen(3333, () => {
  console.log('Server is running');
})

