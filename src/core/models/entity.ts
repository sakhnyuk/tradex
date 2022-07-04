/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from './model';

export abstract class Entity<T extends Record<string, any>> extends Model<T> {
  public readonly id: EntityId;

  constructor(dto: T, idKey?: string) {
    super(dto);
    this.id = (dto ?? {})[idKey ?? 'id'];
  }
}
