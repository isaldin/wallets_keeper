import { AES } from 'crypto-js';

const encryptStringWithPassword = (inputString: string, password: string) => {
  return AES.encrypt(inputString, password).toString();
};

export default encryptStringWithPassword;
