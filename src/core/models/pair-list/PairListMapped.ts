import { Model, PairInfoDto, PairInfoModel } from 'core/models';

export interface PairListMappedDto {
  BTC: PairInfoDto[];
  ALT: PairInfoDto[];
  STABLE: PairInfoDto[];
}

export class PairListMappedModel extends Model<PairListMappedDto> {
  get BTC(): PairInfoModel[] {
    return Model.instantiateDtos<PairInfoDto, PairInfoModel>(this.dto.BTC, PairInfoModel);
  }

  get ALT(): PairInfoModel[] {
    return Model.instantiateDtos<PairInfoDto, PairInfoModel>(this.dto.ALT, PairInfoModel);
  }

  get STABLE(): PairInfoModel[] {
    return Model.instantiateDtos<PairInfoDto, PairInfoModel>(this.dto.STABLE, PairInfoModel);
  }

  get markets(): string[] {
    return Object.keys(this.dto);
  }

  public getListByMarket = (market: string): PairInfoModel[] => {
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
