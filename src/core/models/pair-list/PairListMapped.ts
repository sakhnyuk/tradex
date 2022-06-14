import { Model } from 'core/models';

export interface PairListMappedDto {
  BTC: TradeSymbol[];
  ALT: TradeSymbol[];
  STABLE: TradeSymbol[];
}

export class PairListMappedModel extends Model<PairListMappedDto> {
  get BTC(): TradeSymbol[] {
    return this.dto.BTC ?? [];
  }

  get ALT(): TradeSymbol[] {
    return this.dto.ALT ?? [];
  }

  get STABLE(): TradeSymbol[] {
    return this.dto.STABLE ?? [];
  }

  get markets(): string[] {
    return Object.keys(this.dto);
  }

  public getListByMarket = (market: string): TradeSymbol[] => {
    switch (market) {
      case 'BTC':
        return this.BTC;

      case 'ALT':
        return this.ALT;

      case 'STABLE':
        return this.STABLE;

      default:
        return [];
    }
  };
}
