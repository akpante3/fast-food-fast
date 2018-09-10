
import { Orders } from '../db/dbconnect';


const allOrders = () => Promise.resolve(Orders);

export { allOrders };
