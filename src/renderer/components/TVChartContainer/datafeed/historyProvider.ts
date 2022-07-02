import API from 'app/api';
import { KlineResItem } from 'app/api/exchangesApi/types';
import { forSince } from 'app/utils/chartUtils';
import { saveState } from 'app/utils/localStorage';
import logger from 'app/utils/logger';
import { LibrarySymbolInfo } from '../../../../charting_library/charting_library.min';

const history = {};

export default {
  history,

  getBars(symbolInfo: LibrarySymbolInfo, resolution: string, from: number, to: number, first: boolean) {
    // trying to get time, which I should use for getting more candels(old)
    const secFromInterval = forSince(resolution);

    return API.public
      .fetchOHLCV(symbolInfo, resolution, from, to)
      .then((data: KlineResItem[]) => {
        if (data.length) {
          if (first) {
            saveState(data, symbolInfo.full_name + resolution);
          }
          while (
            // TODO: impove it! CHECK while cycle
            data.length > 0 &&
            Math.abs(data[data.length - 1].time - to * 1000) > 1000 * secFromInterval &&
            !first
          ) {
            data.pop();
          }
          return data;
        }

        return [];
      })
      .catch((error: any) => {
        logger.error(error, '09');
      });
  },
};
