import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { EMAIL_INPUT_TEST_ID, PASSWORD_INPUT_TEST_ID, VALID_EMAIL, VALID_PASSWORD,
  INVALID_EMAIL_0, INVALID_EMAIL_1, INVALID_EMAIL_2, INVALID_EMAIL_3, INVALID_PASSWORD } from './helpers/consts';

describe('1 - Teste a pagina de Login', () => {
  it('Verifica se a rota para esta página é "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('Verifica se contém campo para e-mail, com data-testid="email-input"', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    expect(inputEmail).toBeInTheDocument();
  });
  it('Verifica se contém campo para senha, com data-testid="password-input"', () => {
    renderWithRouterAndRedux(<App />);

    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    expect(inputPassword).toBeInTheDocument();
  });
  it('Verifica se contém botão com o texto "Entrar"', () => {
    renderWithRouterAndRedux(<App />);

    const buttonEntrar = screen.getByRole('button', { name: 'Entrar' });
    expect(buttonEntrar).toBeInTheDocument();
  });
  it('Verifica as validações do campo de email, senha válida e habilitação do botão', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT_TEST_ID), INVALID_EMAIL_0);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT_TEST_ID), VALID_PASSWORD);
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();

    userEvent.clear(screen.getByTestId(EMAIL_INPUT_TEST_ID));
    userEvent.type(screen.getByTestId(EMAIL_INPUT_TEST_ID), INVALID_EMAIL_1);
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();

    userEvent.clear(screen.getByTestId(EMAIL_INPUT_TEST_ID));
    userEvent.type(screen.getByTestId(EMAIL_INPUT_TEST_ID), INVALID_EMAIL_2);
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();

    userEvent.clear(screen.getByTestId(EMAIL_INPUT_TEST_ID));
    userEvent.type(screen.getByTestId(EMAIL_INPUT_TEST_ID), INVALID_EMAIL_3);
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();

    userEvent.clear(screen.getByTestId(EMAIL_INPUT_TEST_ID));
    userEvent.clear(screen.getByTestId(PASSWORD_INPUT_TEST_ID));

    userEvent.type(screen.getByTestId(EMAIL_INPUT_TEST_ID), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT_TEST_ID), INVALID_PASSWORD);
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();

    userEvent.clear(screen.getByTestId(EMAIL_INPUT_TEST_ID));
    userEvent.clear(screen.getByTestId(PASSWORD_INPUT_TEST_ID));

    userEvent.type(screen.getByTestId(EMAIL_INPUT_TEST_ID), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT_TEST_ID), VALID_PASSWORD);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
  it.skip('Verifica se salva o email no estado da aplicação, com a chave email, assim que o usuário logar', () => {
    renderWithRouterAndRedux(<App />);
  });
  it.skip('Verifica se a rota é alterada para "/carteira" após o clique no botão', () => {
    renderWithRouterAndRedux(<App />);
  });
});
