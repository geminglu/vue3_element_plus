import type { configType } from './type';

const dataSetDefault = {
  autoQuery: false,
  query: [],
};

export function DataSet(dataSet: configType) {
  return {
    config: {
      ...dataSetDefault,
      ...dataSet,
    },
    query: () => {},
    load: (data: any) => {},
  };
}
