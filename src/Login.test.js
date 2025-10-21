import { AuthProvider } from './AuthProvider';
import Login from './Login';
import store from './store';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

const mockedNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockedNavigate,
}));

const mockedUseDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedUseDispatch,
}));

describe('Testing the user profile', () => {
  test('check the login component renders', () => {
    render(
      <Provider store={store}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Provider>
    );
  });

  test('error is shown if login data is incorrect', async () => {
    render(
      <Provider store={store}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Provider>
    );
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
    mockedUseDispatch.mockImplementationOnce((action) => {
      action.payload.onFailure();
    });
    fireEvent.click(loginButton);
    expect(
      await screen.findByText(/Emailadresse oder Passwort ist inkorrekt/)
    ).toBeInTheDocument();
  });

  test('login page navigates to root on correct login', async () => {
    render(
      <Provider store={store}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Provider>
    );
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
    mockedUseDispatch.mockImplementationOnce((action) => {
      action.payload.onSuccess({ username: 'test-username' });
    });
    fireEvent.click(loginButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
