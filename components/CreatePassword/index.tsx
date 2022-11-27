import React, { useEffect, useState } from 'react';

import { Nullable } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';

type CreatePasswordProps = {
  onPasswordEnter: (password: string) => void;
};

const CreatePassword: React.FC<CreatePasswordProps> = (props) => {
  const [passwordInputs, setPasswordInputs] = useState<{ password: string; confirm: string }>({
    password: '',
    confirm: '',
  });
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [formMessage, setFormMessage] = useState<Nullable<string>>(null);

  useEffect(() => {
    const { password, confirm } = passwordInputs;

    setIsButtonEnabled(password !== '' && password === confirm);

    if (password !== '') {
      if (password !== confirm) {
        setFormMessage('Passwords not matched');
      } else {
        setFormMessage(null);
      }
    }
  }, [passwordInputs]);

  const createPassword = () => {
    props.onPasswordEnter(passwordInputs.password);
  };

  return (
    <div className="p-4">
      <p className="text-2xl">Create password</p>
      <span className="text-red-400">Be careful: you will not be able to recover it</span>
      <Input
        id="password"
        type="password"
        label="Please enter your password:"
        value={passwordInputs.password}
        onChange={(value) =>
          setPasswordInputs((prevState) => ({
            ...prevState,
            password: value,
          }))
        }
        className="pt-4"
      />
      <Input
        id="confirm"
        type="password"
        label="Re-type your password:"
        value={passwordInputs.confirm}
        onChange={(value) =>
          setPasswordInputs((prevState) => ({
            ...prevState,
            confirm: value,
          }))
        }
        className="pt-4"
      />

      {formMessage && <div className="text-red-600">{formMessage}</div>}

      <div className="flex justify-end pt-4">
        <Button id="button" onClick={createPassword} disabled={!isButtonEnabled}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreatePassword;
