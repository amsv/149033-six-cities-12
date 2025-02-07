import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeOffers, makeFakeUserData } from '../../utils/mocks';
import LoginForm from './login-form';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureMockStore([thunk]);
const fakeOffers = makeFakeOffers();
const fakeUserData = makeFakeUserData();

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: fakeUserData,
  },
  [NameSpace.Offers]: { offers: fakeOffers },
});

describe('Component: LoginForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should display error', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    await act(
      async () =>
        await userEvent.type(screen.getByPlaceholderText(/Email/i), 'test')
    );
    await act(
      async () =>
        await userEvent.type(screen.getByPlaceholderText(/Password/i), '222')
    );
    await act(
      async () =>
        await userEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    );
  });

  it('should display no error', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    await act(
      async () =>
        await userEvent.type(
          screen.getByPlaceholderText(/Email/i),
          'test@mail.ru'
        )
    );
    await act(
      async () =>
        await userEvent.type(screen.getByPlaceholderText(/Password/i), '222a')
    );
    await act(
      async () =>
        await userEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    );
    expect(
      screen.queryByText(/Incorrect Email address/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/At least one letter and one number/i)
    ).not.toBeInTheDocument();
  });

  it('should render correctly and type email/password', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    await act(
      async () =>
        await userEvent.type(screen.getByTestId('email'), 'keks@mail.ru')
    );
    await act(
      async () =>
        await userEvent.type(screen.getByTestId('password'), '123456f')
    );

    expect(screen.getByDisplayValue(/keks@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

});
