import map from 'lodash/map';
import defaultsDeep from 'lodash/defaultsDeep';

/**
 * Base method for all the entities or non-entities that has
 * an immutable state
 * T is a DTO
 */
export abstract class Model<T extends Record<string, any>> {
  /**
   * API response structure is not guaranteed at runtime
   * Always use optional chaining on a dto.
   */
  protected readonly dto: T;

  constructor(dto: T) {
    if (dto instanceof Model) {
      this.dto = dto.getDto();
    } else {
      this.dto = dto || {};
    }
  }

  /**
   * Returns a copy of dto object
   */
  getDto(): T {
    return { ...this.dto };
  }

  /**
   * Instantiates an array of dto's with the given class
   */
  static instantiateDtos<T, U>(dtos: T[] = [], Type: new (dto: T) => U): U[] {
    return map(dtos, (dto) => new Type(dto));
  }

  /**
   * Returns a new object by updating properties
   * Generic U represents current model
   * @param partialDto Partial properties of current object to be updated
   * @param Type Class of the current object
   */
  updateModel<U>(partialDto: Partial<T>, Type: new (...args: any[]) => U): U {
    return new Type(defaultsDeep({ ...partialDto }, this.getDto()));
  }
}
