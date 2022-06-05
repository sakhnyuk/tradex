import { TradeSide } from 'core/types';
import { Entity } from 'core/models';

export interface TradeInfoDto {
  id: EntityId;
  side: TradeSide;
  time: Timestamp;
  price: Price;
  amount: number;
  symbol: TradeSymbol;
  exchange: string;
}

export class TradeInfoModel extends Entity<TradeInfoDto> {
  get side(): TradeSide {
    return this.dto.side;
  }

  get time(): Timestamp {
    return this.dto.time;
  }

  get price(): Price {
    return this.dto.price;
  }

  get amount(): number {
    return this.dto.amount;
  }

  get symbol(): TradeSymbol {
    return this.dto.symbol;
  }

  get exchange(): string {
    return this.dto.exchange;
  }
}
