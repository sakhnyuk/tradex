import { Model, PairListMappedModel, PairInfoModel } from 'core/models';

export interface PairListDto {
  mapped: PairListMappedModel;
  fullList: Record<TradeSymbol, PairInfoModel>;
}

export class PairListModel extends Model<PairListDto> {
  get mapped(): PairListMappedModel {
    return this.dto.mapped;
  }

  get fullList(): Record<TradeSymbol, PairInfoModel> {
    return this.dto.fullList;
  }
}
