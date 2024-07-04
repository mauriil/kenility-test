import { Mongoose } from 'mongoose';
import { UserSchema } from './schemas/users.schema';

export const usersProviders = [
  {
    provide: 'USERS_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Users', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
