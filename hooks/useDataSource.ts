import { useContext } from 'react';

import { DataSourceContext } from '../contexts/dataSourceContext';

export const useDataSource = () => {
  const { dataSource, setDataSource } = useContext(DataSourceContext);
  return { dataSource, setDataSource };
};
