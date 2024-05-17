import User, { IUser } from '../models/user';
import BaseRepository from './base.repository';

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }
}

export default new UserRepository();
