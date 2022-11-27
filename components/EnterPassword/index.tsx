import React, { useState } from 'react';

import Button from '../common/Button';
import Input from '../common/Input';

type EnterPasswordProps = {
  onPasswordEnter: (password: string) => void;
  errorMessage?: string;
};

const EnterPassword: React.FC<EnterPasswordProps> = (props) => {
  const [password, setPassword] = useState<string>('');

  const handleEnterClick = () => {
    props.onPasswordEnter(password);
  };

  return (
    <div>
      <Input
        id="password"
        type="password"
        label="Enter password:"
        value={password}
        onChange={setPassword}
      ></Input>
      {props.errorMessage && <div className="text-red-400">{props.errorMessage}</div>}

      <div className="pt-4 flex justify-end">
        <Button id="enter_button" onClick={handleEnterClick}>
          Enter
        </Button>
      </div>
    </div>
  );
};

export default EnterPassword;
