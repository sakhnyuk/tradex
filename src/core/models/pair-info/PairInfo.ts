import { Model } from 'core/models';

export interface PairInfoDto {
  symbol: TradeSymbol;
  volume: number;
  priceChangePercent: number;
  price: Price;
  high: Price;
  low: Price;
  quote: string;
  base: string;
  maxLeverage: number;
  tickSize: number;
}

export class PairInfoModel extends Model<PairInfoDto> {
  get symbol(): TradeSymbol {
    return this.dto.symbol;
  }

  get volume(): number {
    return this.dto.volume;
  }

  get priceChangePercent(): number {
    return this.dto.priceChangePercent;
  }

  get price(): Price {
    return this.dto.price;
  }

  get high(): Price {
    return this.dto.high;
  }

  get low(): Price {
    return this.dto.low;
  }

  get quote(): string {
    return this.dto.quote;
  }

  get base(): string {
    return this.dto.base;
  }

  get maxLeverage(): number {
    return this.dto.maxLeverage;
  }

  get tickSize(): number {
    return this.dto.tickSize;
  }
}
