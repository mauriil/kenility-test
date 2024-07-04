import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, collection: 'users' },
).index({ email: 1 }, { unique: true });

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
