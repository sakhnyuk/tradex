import { OrderBookUpdateType } from 'core/types';
import { Model, OrderBookItemDto, OrderBookItemModel } from 'core/models';

export interface OrderBookDto {
  asks: OrderBookItemDto[];
  bids: OrderBookItemDto[];
}

export interface OrderBookUpdateInfo extends OrderBookDto {
  type: OrderBookUpdateType;
  exchange: string;
  symbol: TradeSymbol;
}

export class OrderBookModel extends Model<OrderBookDto> {
  get asks(): OrderBookItemModel[] {
    return Model.instantiateDtos<OrderBookItemDto, OrderBookItemModel>(this.dto.asks, OrderBookItemModel);
  }

  get bids(): OrderBookItemModel[] {
    return Model.instantiateDtos<OrderBookItemDto, OrderBookItemModel>(this.dto.bids, OrderBookItemModel);
  }
}
