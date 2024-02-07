import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './userInterface';
import bcrypt from 'bcrypt';
import config from '../../../config';
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_saltrounds),
  );
  next();
});
export const UserModel = model<IUser, IUserModel>('User', userSchema);
