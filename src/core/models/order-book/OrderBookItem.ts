import { Model } from 'core/models';

export interface OrderBookItemDto {
  price: Price;
  base: number;
  quote: number;
  quoteTotal: number;
  baseTotal: number;
}

export class OrderBookItemModel extends Model<OrderBookItemDto> {
  get price(): Price {
    return this.dto.price;
  }

  get base(): number {
    return this.dto.base;
  }

  get quote(): number {
    return this.dto.quote;
  }

  get quoteTotal(): number {
    return this.dto.quoteTotal;
  }

  get baseTotal(): number {
    return this.dto.baseTotal;
  }
}
