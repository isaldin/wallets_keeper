import React, { useContext, useState } from 'react';
import { useBalance } from 'wagmi';

import { RuntimePasswordContext } from '../../../contexts/runtimePasswordContext';
import { Nullable, Optional } from '../../../types';
import EnterPassword from '../../EnterPassword';
import Button from '../Button';
import CopyButton from '../icons/CopyIcon';
import EyeIcon from '../icons/EyeIcon';
import Modal from '../Modal';

type WalletProps = {
  address: `0x${string}`;
  encryptedPrivateKey: string;
};

const Wallet: React.FC<WalletProps> = (props) => {
  const { decryptString } = useContext(RuntimePasswordContext);
  const [isModalShown, setModalShown] = useState(false);
  const [decryptErrorMessage, setDecryptErrorMessage] = useState<Optional<string>>();
  const [decryptedPrivateKey, setDecryptedPrivateKey] = useState<Nullable<string>>(null);
  const { data } = useBalance({ address: props.address });

  const handleShowPrivateKeyIcon = () => {
    setModalShown(true);
  };

  const handlePasswordEnter = (password: string) => {
    setDecryptErrorMessage(undefined);

    const privateKey = decryptString(props.encryptedPrivateKey, password);
    if (!privateKey) {
      setDecryptErrorMessage('Password is incorrect');
      return;
    }

    setDecryptedPrivateKey(privateKey);
  };

  const handleModalClose = () => {
    setModalShown(false);
    setDecryptedPrivateKey(null);
    setDecryptErrorMessage(undefined);
  };

  const renderModalContent = () => {
    return decryptedPrivateKey ? (
      <div className="break-all">
        <div className="break-words text-slate-100 text-sm flex items-center">
          {decryptedPrivateKey}
          <CopyButton onClick={() => navigator.clipboard.writeText(decryptedPrivateKey)} />
        </div>
        <div className="flex justify-end pt-4">
          <Button onClick={handleModalClose}>Got it</Button>
        </div>
      </div>
    ) : (
      <EnterPassword onPasswordEnter={handlePasswordEnter} errorMessage={decryptErrorMessage} />
    );
  };

  return (
    <div className="flex flex-col justify-between border-gray-700 border-2 p-4 mt-2">
      <Modal
        isShown={isModalShown}
        title="Show private key"
        renderContent={renderModalContent}
        onClose={handleModalClose}
      />
      <div className="flex justify-between">
        <div>{props.address}</div>
        <div className="cursor-pointer" onClick={handleShowPrivateKeyIcon}>
          <EyeIcon></EyeIcon>
        </div>
      </div>
      {data && (
        <div className="flex justify-end mt-2">
          {data.formatted} {data.symbol}
        </div>
      )}
    </div>
  );
};

export default Wallet;
