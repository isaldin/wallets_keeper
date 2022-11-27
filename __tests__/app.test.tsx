import '@testing-library/jest-dom';

import { fireEvent, getByText, render, RenderResult } from '@testing-library/react';
import React from 'react';

import { DataSourceContextProvider } from '../contexts/dataSourceContext';
import * as getDataSourceModule from '../contexts/getDataSource';
import { RuntimePasswordContextProvider } from '../contexts/runtimePasswordContext';
import MainPage from '../pages';
import * as decryptStringWithPasswordModule from '../utils/crypto/decryptStringWithPassword';
import { CreatePasswordPO, getCreatePasswordPO } from './CreatePassword.test';

jest.mock('../utils/crypto/decryptStringWithPassword', () => {
  const _decryptModule = jest.requireActual('../utils/crypto/decryptStringWithPassword');
  return {
    ..._decryptModule,
    __esModule: true,
    default: jest.fn(_decryptModule.default),
  };
});

jest.mock('../contexts/getDataSource', () => {
  return {
    ...jest.requireActual('../contexts/getDataSource'),
    getDataSource: jest.fn(),
  };
});

const AppComponent = () => (
  <DataSourceContextProvider>
    <RuntimePasswordContextProvider>
      <MainPage />
    </RuntimePasswordContextProvider>
  </DataSourceContextProvider>
);

describe('App flow', () => {
  describe('when localstorage is empty', () => {
    let renderResult: RenderResult;
    let createPasswordPO: CreatePasswordPO;

    beforeEach(() => {
      jest.spyOn(getDataSourceModule, 'getDataSource').mockImplementation(() => ({ wallets: [] }));

      renderResult = render(<AppComponent />);
      createPasswordPO = getCreatePasswordPO(renderResult);
    });

    it('should ask for create password first', () => {
      getByText(renderResult.container, 'Create password');
      getByText(renderResult.container, 'Please enter your password:');
      getByText(renderResult.container, 'Re-type your password:');
      getByText(renderResult.container, 'Create');
    });

    it('should redirect to wallets list when password created', () => {
      fireEvent.change(createPasswordPO.password, { target: { value: '123' } });
      fireEvent.change(createPasswordPO.confirm, { target: { value: '123' } });
      fireEvent.click(createPasswordPO.button);

      getByText(renderResult.container, 'Create wallet');
    });
  });

  describe('when password already set', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      jest
        .spyOn(getDataSourceModule, 'getDataSource')
        .mockImplementation(() => ({ wallets: [], passwordTag: 'asdfasdf' }));

      renderResult = render(<AppComponent />);
    });

    it('should ask for password at first', () => {
      getByText(renderResult.container, 'Enter password:');
    });

    it('should show "Incorrect password" message when entered incorrect password', () => {
      const passwordField = renderResult.container.querySelector('#password') as HTMLInputElement;
      const enterButton = renderResult.container.querySelector(
        '#enter_button',
      ) as HTMLButtonElement;

      fireEvent.change(passwordField, { target: { value: '123' } });
      fireEvent.click(enterButton);

      getByText(renderResult.container, 'Incorrect password');
    });

    it('should redirect to wallets list after entering password', () => {
      jest.spyOn(decryptStringWithPasswordModule, 'default').mockImplementation(() => 'success');

      const passwordField = renderResult.container.querySelector('#password') as HTMLInputElement;
      const enterButton = renderResult.container.querySelector(
        '#enter_button',
      ) as HTMLButtonElement;

      fireEvent.change(passwordField, { target: { value: '123' } });
      fireEvent.click(enterButton);

      getByText(renderResult.container, 'Create wallet');
    });
  });
});
