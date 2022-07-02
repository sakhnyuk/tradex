import { IChartingLibraryWidget } from 'tv-chart/charting_library.min';

declare global {
  interface Window {
    tvWidget: IChartingLibraryWidget | undefined;
    updateCbs: any[];
    resetCache: any;
    updateChartPrice: any;
  }
}
