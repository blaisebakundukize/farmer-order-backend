import { Schema, model, Document } from 'mongoose';
import { USER_ROLES } from '../constants';

export interface IUser extends Document {
  name: string;
  phoneNumber: string;
  role: string;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  role: { type: String, enum: USER_ROLES, default: USER_ROLES.FARMER },
});

const User = model<IUser>('User', userSchema);

export default User;
