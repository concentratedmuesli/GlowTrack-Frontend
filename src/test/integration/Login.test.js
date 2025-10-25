import { AuthProvider } from '../../authorization/AuthProvider';
import Login from '../../authorization/Login';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createRoutesStub } from 'react-router';

const helmetContext = {};

const Stub = createRoutesStub([
  { path: '/login', Component: Login },
  { path: '/', Component: () => <div>Dashboard</div> },
]);

function renderLoginComponent() {
  render(
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <AuthProvider>
          <Stub initialEntries={['/login']} />
        </AuthProvider>
      </HelmetProvider>
    </Provider>
  );
}

describe('Testing the user profile', () => {
  test('check the login component renders', () => {
    // Testet, dass die Komponente ohne mocking von useNavigate rendert.
    renderLoginComponent();
  });

  test('error is shown if login data is incorrect', async () => {
    renderLoginComponent();
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
    expect(
      await screen.findByText(/Emailadresse oder Passwort ist inkorrekt/)
    ).toBeInTheDocument();
  });

  test('login page navigates to root on correct login', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        username: 'Liz',
        email: 'liz@abeth.com',
        birthdate: '1995-10-23',
      }),
    });
    renderLoginComponent();
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
    const email = screen.getByTestId('email');
    fireEvent.change(email, { target: { value: 'liz@abeth.com' } });
    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: 'password' } });
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });
});
