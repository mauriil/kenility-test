import { Document } from 'mongoose';

export interface OrderProduct {
  [x: string]: any;
  _id: string;
  sku: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order extends Document {
  products: OrderProduct[];
  user: string;
  total: number;
}
