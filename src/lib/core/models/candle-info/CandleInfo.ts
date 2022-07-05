import { Model } from 'lib/core/models';

export interface CandleInfoDto {
  close: number;
  high: number;
  low: number;
  open: number;
  time: number;
  volume: number;
}

export class CandleInfoModel extends Model<CandleInfoDto> {
  close: Price;
  high: Price;
  low: Price;
  open: Price;
  time: Timestamp;
  volume: number;

  constructor(data: CandleInfoDto) {
    super(data);
    this.close = data.close;
    this.high = data.high;
    this.low = data.low;
    this.open = data.open;
    this.time = data.time;
    this.volume = data.volume;
  }
}
