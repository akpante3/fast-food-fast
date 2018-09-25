import {} from 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './app/routes/users';


const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', userRoutes);

const date = new Date();
app.listen(port, () => {
  console.log(`running on ${port}  ${date}`);
});

export default app;

