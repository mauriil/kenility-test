import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Buffer, required: true },
  },
  {
    timestamps: true,
  },
).index({ sku: 1 }, { unique: true });

ProductSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
});
