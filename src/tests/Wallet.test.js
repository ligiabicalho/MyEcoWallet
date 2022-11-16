import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import {
  EMAIL_INPUT_TEST_ID, PASSWORD_INPUT_TEST_ID, VALID_EMAIL, VALID_PASSWORD,
  EMAIL_FIELD_TEST_ID, HEADER_CURRENCY_FIELD_TEST_ID, TOTAL_FIELD_TEST_ID, BTN_ADD,
  CURRENCY_INPUT_TEST_ID, VALUE_INPUT_TEST_ID, METHOD_INPUT_TEST_ID, TAG_INPUT_TEST_ID,
  DESCRIPTION_INPUT_TEST_ID } from './helpers/consts';

describe('Testa a página da Carteira, Wallet page', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByTestId(EMAIL_INPUT_TEST_ID), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT_TEST_ID), VALID_PASSWORD);
    act(() => { userEvent.click(screen.getByRole('button', { name: 'Entrar' })); });
  });

  it('Verifica se uma requisição a API é feita quando acessa a página', () => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });

  it('Verifica se o Header contém o email de login e valor total das despesas', async () => {
    const headerEmail = screen.getByTestId(EMAIL_FIELD_TEST_ID);
    const headerCurrency = screen.getByTestId(HEADER_CURRENCY_FIELD_TEST_ID);
    const totalField = await screen.findByTestId(TOTAL_FIELD_TEST_ID);

    expect(headerEmail).toHaveTextContent(VALID_EMAIL);
    expect(headerCurrency).toHaveTextContent('BRL');
    expect(totalField).toBeInTheDocument();
    expect(totalField).toHaveTextContent('0.00');
  });

  it('Verifica se o formulário contém todos os campos para add despesas', () => {
    const value = screen.getByTestId(VALUE_INPUT_TEST_ID);
    const currency = screen.getByTestId(CURRENCY_INPUT_TEST_ID);
    const method = screen.getByTestId(METHOD_INPUT_TEST_ID);
    const tag = screen.getByTestId(TAG_INPUT_TEST_ID);
    const description = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);

    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();

    const buttonAdd = screen.getByRole('button', { name: BTN_ADD });
    expect(buttonAdd).toBeInTheDocument();
  });

  it('Verifica se é feita uma requisição na API ao clicar em adicionar e atualiza Header', async () => {
    const value = screen.getByTestId(VALUE_INPUT_TEST_ID);
    const description = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);

    userEvent.type(value, '10');
    expect(value).toHaveValue(10);

    userEvent.type(description, 'Dez dólares');
    expect(description).toHaveValue('Dez dólares');

    const buttonAdd = screen.getByRole('button', { name: BTN_ADD });
    act(() => { userEvent.click(buttonAdd); });
    const totalField = await screen.findByTestId(TOTAL_FIELD_TEST_ID);

    expect(value).toHaveTextContent('');

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const exchangeRateUSD = mockData.USD.ask;
    const expectedValue = (10 * exchangeRateUSD).toFixed(2);
    expect(totalField).toHaveTextContent(expectedValue);
  });

  it('Verifica se a despesa adicionada é renderizada na tabela', async () => {
    const tableHeader = screen.getAllByRole('columnheader');
    expect(tableHeader).toHaveLength(9);

    const value = screen.getByTestId(VALUE_INPUT_TEST_ID);
    const description = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);
    const currency = screen.getByTestId(CURRENCY_INPUT_TEST_ID);

    userEvent.type(value, '20');
    userEvent.type(description, '20 euros');

    const buttonAdd = screen.getByRole('button', { name: BTN_ADD });
    act(() => { userEvent.click(buttonAdd); });

    expect(global.fetch).toHaveBeenCalled();

    // const tableRows = await screen.findAllByRole('row');
    // expect(tableRows).toHaveLength(2); // ?

    const exchangeRateUSD = mockData.USD.ask;
    const expectedValue = (20 * exchangeRateUSD).toFixed(2);
    const totalField = await screen.findByTestId(TOTAL_FIELD_TEST_ID);
    expect(totalField).toHaveTextContent(expectedValue);

    const editBtn = await screen.findByRole('button', { name: 'Editar' });
    userEvent.click(editBtn);

    userEvent.type(currency, 'EUR');
    const editExpenseBtn = await screen.findByRole('button', { name: 'Editar despesa' });
    userEvent.click(editExpenseBtn);

    const exchangeRateEUR = mockData.EUR.ask;
    const expectedNewValue = (20 * exchangeRateEUR).toFixed(2);
    waitFor(() => { expect(totalField).toHaveTextContent(expectedNewValue); });
    // const newTotalField = await screen.findByTestId(TOTAL_FIELD_TEST_ID);
    // expect(newTotalField).toHaveTextContent(expectedNewValue);
  });

  it('Verifica se as despesas são deletadas', async () => {
    const value = screen.getByTestId(VALUE_INPUT_TEST_ID);
    const description = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);
    const buttonAdd = screen.getByRole('button', { name: BTN_ADD });

    userEvent.type(value, '15');
    userEvent.type(description, '15 Dólares');
    act(() => { userEvent.click(buttonAdd); });

    const deleteBtn = await screen.findByRole('button', { name: 'Delete' });
    userEvent.click(deleteBtn);
  });
});
