import { Document } from 'mongoose';

export interface Product extends Document {
  sku: string;
  name: string;
  price: number;
  image: Buffer | string;
}
