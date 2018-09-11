import express from 'express';
import bodyParser from 'body-parser';
import ordersRoutes from './app/routes/orders';

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1', ordersRoutes);

app.listen(port, () => {
  console.log(`running on ${port}`);
});

export default app;
