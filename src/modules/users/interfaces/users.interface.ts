import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  password: string;
  email: string;
}

export interface UserLogin {
  name: string;
  id: string;
}

export interface UserSignUp {
  name: string;
  id: string;
}

export interface VerifyToken {
  userName: string;
  userId: string;
}
