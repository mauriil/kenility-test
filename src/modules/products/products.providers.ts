import { Mongoose } from 'mongoose';
import { ProductSchema } from './schemas/products.schema';

export const productsProviders = [
  {
    provide: 'PRODUCTS_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Product', ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
