import Farmer, { IFarmer } from '../models/farmer';
import BaseRepository from './base.repository';

class FarmerRepository extends BaseRepository<IFarmer> {
  constructor() {
    super(Farmer);
  }
}

export default new FarmerRepository();
