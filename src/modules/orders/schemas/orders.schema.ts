import * as mongoose from 'mongoose';

const OrderProduct = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const OrderSchema = new mongoose.Schema(
  {
    products: [OrderProduct],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

OrderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
});
