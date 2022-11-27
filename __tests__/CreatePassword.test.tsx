import '@testing-library/jest-dom';

import { fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';

import CreatePassword from '../components/CreatePassword';

export type CreatePasswordPO = {
  button: HTMLButtonElement;
  password: HTMLInputElement;
  confirm: HTMLInputElement;
};

export const getCreatePasswordPO = (form: RenderResult): CreatePasswordPO => ({
  button: form.container.querySelector('#button') as HTMLButtonElement,
  password: form.container.querySelector('#password') as HTMLInputElement,
  confirm: form.container.querySelector('#confirm') as HTMLInputElement,
});

describe('CreatePassword screen', () => {
  it('Button should be disabled when passwords not matched', () => {
    const form = render(<CreatePassword onPasswordEnter={() => {}} />);
    const po = getCreatePasswordPO(form);

    expect(po.button.disabled).toEqual(true);

    fireEvent.change(po.password, { target: { value: '123' } });
    expect(po.button.disabled).toEqual(true);

    fireEvent.change(po.confirm, { target: { value: '123' } });
    expect(po.button.disabled).toEqual(false);
  });

  it('should return entered and confirmed password when matched and button clicked', () => {
    let handlePasswordEnterFn = jest.fn();
    const form = render(<CreatePassword onPasswordEnter={handlePasswordEnterFn} />);
    const po = getCreatePasswordPO(form);

    fireEvent.change(po.password, { target: { value: '54321' } });
    fireEvent.change(po.confirm, { target: { value: '54321' } });
    fireEvent.click(po.button);

    expect(handlePasswordEnterFn).toBeCalledWith('54321');
    expect(handlePasswordEnterFn).toBeCalledTimes(1);
  });
});
