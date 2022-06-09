import { OrderBookUpdateType } from 'core/types';
import { Model, OrderBookItemDto, OrderBookItemModel } from 'core/models';

export interface OrderBookRawDto {
  asks: [Price, TradeVolume][];
  bids: [Price, TradeVolume][];
}

export interface OrderBookUpdateInfo extends OrderBookRawDto {
  type: OrderBookUpdateType;
  exchange: string;
  symbol: TradeSymbol;
}

export interface OrderBookParsedDto {
  asks: OrderBookItemDto[];
  asksTotalBase: TradeVolume;
  asksTotalQuote: TradeVolume;

  bids: OrderBookItemDto[];
  bidsTotalBase: TradeVolume;
  bidsTotalQuote: TradeVolume;
}

export class OrderBookModel extends Model<Partial<OrderBookParsedDto>> {
  get asks(): OrderBookItemModel[] {
    return Model.instantiateDtos<OrderBookItemDto, OrderBookItemModel>(this.dto.asks, OrderBookItemModel);
  }

  get asksTotalBase(): TradeVolume {
    return this.dto.asksTotalBase ?? 0;
  }

  get asksTotalQuote(): TradeVolume {
    return this.dto.asksTotalQuote ?? 0;
  }

  get bids(): OrderBookItemModel[] {
    return Model.instantiateDtos<OrderBookItemDto, OrderBookItemModel>(this.dto.bids, OrderBookItemModel);
  }

  get bidsTotalBase(): TradeVolume {
    return this.dto.bidsTotalBase ?? 0;
  }

  get bidsTotalQuote(): TradeVolume {
    return this.dto.bidsTotalQuote ?? 0;
  }
}
