import { Document, Model } from 'mongoose';

abstract class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = new this.model(data);
    return entity.save();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findAll(skip: number, limit: number): Promise<T[]> {
    return this.model.find().skip(skip).limit(limit);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}

export default BaseRepository;
