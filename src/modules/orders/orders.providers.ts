import { Mongoose } from 'mongoose';
import { OrderSchema } from './schemas/orders.schema';

export const ordersProviders = [
  {
    provide: 'ORDERS_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Order', OrderSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
