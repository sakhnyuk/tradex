import { Model } from 'core/models';

export interface CandleInfoDto {
  close: number;
  high: number;
  low: number;
  open: number;
  time: number;
  volume: number;
}

export class CandleInfoModel extends Model<CandleInfoDto> {
  get close(): Price {
    return this.dto.close;
  }

  get high(): Price {
    return this.dto.high;
  }

  get low(): Price {
    return this.dto.low;
  }

  get open(): Price {
    return this.dto.open;
  }

  get time(): Timestamp {
    return this.dto.time;
  }

  get volume(): number {
    return this.dto.volume;
  }
}
