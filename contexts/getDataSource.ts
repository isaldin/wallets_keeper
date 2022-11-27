export const DATA_SOURCE_LOCAL_STORAGE_KEY = 'data_source';

export type DataSourceShape = {
  passwordTag?: string;
  wallets: Array<{ address: `0x${string}`; encryptedPrivateKey: string }>;
};

export const getDataSource = (): DataSourceShape => {
  if (typeof window === 'undefined') {
    return { wallets: [] };
  }

  return JSON.parse(localStorage.getItem(DATA_SOURCE_LOCAL_STORAGE_KEY) || '{"wallets": []}');
};
