import React, { useContext } from 'react';

import Button from '../components/common/Button';
import Wallet from '../components/common/Wallet';
import { RuntimePasswordContext } from '../contexts/runtimePasswordContext';
import { useDataSource } from '../hooks/useDataSource';
import createWallet from '../utils/blockchain/createWallet';

type MainPageProps = {
  //
};

const MainPage: React.FC<MainPageProps> = () => {
  const { dataSource, setDataSource } = useDataSource();
  const { encryptString } = useContext(RuntimePasswordContext);

  const createNewWallet = () => {
    const rawWallet = createWallet();
    const encryptedWallet = {
      address: rawWallet.address as `0x${string}`,
      encryptedPrivateKey: encryptString(rawWallet.privateKey),
    };
    setDataSource({
      wallets: [...dataSource.wallets, encryptedWallet],
    });
  };

  return (
    <div className="p-4">
      {dataSource.wallets.map((wallet) => (
        <Wallet key={wallet.address} {...wallet} />
      ))}
      <div className="flex justify-end pt-8">
        <Button onClick={createNewWallet}>Create wallet</Button>
      </div>
    </div>
  );
};

export default MainPage;
