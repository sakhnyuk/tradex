import { CracoConfig } from '@craco/craco/dist/types/config';

const config: CracoConfig = {
  babel: {
    plugins: ['babel-plugin-transform-typescript-metadata'],
  },
};

export default config;
