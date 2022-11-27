import React, { createContext, useEffect, useState } from 'react';

import { DATA_SOURCE_LOCAL_STORAGE_KEY, DataSourceShape, getDataSource } from './getDataSource';

type DataSourceContextType = {
  dataSource: DataSourceShape;
  setDataSource: (chunk: Partial<DataSourceShape>) => void;
};

// @ts-ignore
export const DataSourceContext = createContext<DataSourceContextType>();

export const DataSourceContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [dataSource, setDataSource] = useState<DataSourceShape>(getDataSource());

  useEffect(() => {
    localStorage.setItem(DATA_SOURCE_LOCAL_STORAGE_KEY, JSON.stringify(dataSource));
  }, [dataSource]);

  return (
    <DataSourceContext.Provider
      value={{
        dataSource,
        setDataSource: (ds) => {
          setDataSource({ ...dataSource, ...ds });
        },
      }}
    >
      {props.children}
    </DataSourceContext.Provider>
  );
};
