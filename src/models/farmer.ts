import { Schema, model, Document } from 'mongoose';

interface IFarmer extends Document {
  user: Schema.Types.ObjectId;
  landSize: number;
}

const farmerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  landSize: { type: Number, required: true }, // Size should be in acre
});

const Farmer = model<IFarmer>('Farmer', farmerSchema);

export default Farmer;
