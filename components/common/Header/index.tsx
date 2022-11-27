import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useNetwork } from 'wagmi';

import Button from '../Button';

type HeaderProps = {
  //
};

const Header: React.FC<HeaderProps> = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { chain } = useNetwork();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-16 px-2 bg-slate-200 text-black flex justify-between items-center">
      <div className="text-3xl">Wallets keeper</div>
      {mounted && (
        <>
          {isConnected && <div className="text-xl">{chain?.name}</div>}
          {!isConnected && (
            <Button
              onClick={() => {
                connect({ connector: connectors[0] });
              }}
            >
              Connect
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
