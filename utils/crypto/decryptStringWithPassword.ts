import { AES, enc } from 'crypto-js';

import { Nullable } from '../../types';

const decryptStringWithPassword = (inputString: string, password: string): Nullable<string> => {
  try {
    const bytes = AES.decrypt(inputString, password);
    return bytes.toString(enc.Utf8);
  } catch (_) {
    return null;
  }
};

export default decryptStringWithPassword;
