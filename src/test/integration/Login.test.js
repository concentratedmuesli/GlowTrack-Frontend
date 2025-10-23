import { AuthProvider } from '../../AuthProvider';
import Login from '../../Login';
import store from '../../store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router';

const helmetContext = {};

describe('Testing the user profile', () => {
  test('check the login component renders', () => {
    // Testet, dass die Komponente ohne mocking von useNavigate rendert.
    render(
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <AuthProvider>
            <MemoryRouter initialEntries={['/']}>
              <Login />
            </MemoryRouter>
          </AuthProvider>
        </HelmetProvider>
      </Provider>
    );
  });
});
