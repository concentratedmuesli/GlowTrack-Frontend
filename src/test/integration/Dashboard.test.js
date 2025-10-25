import Dashboard from '../../Dashboard';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '../../AuthProvider';
import store from '../../store';

global.fetch = jest.fn();

const helmetContext = {};

function renderDashboardComponent() {
  render(
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <AuthProvider>
          <MemoryRouter initialEntries={['/']}>
            <Dashboard />
          </MemoryRouter>
        </AuthProvider>
      </HelmetProvider>
    </Provider>
  );
}

describe('Testing the dashboard', () => {
  test('check the dashboard component renders', () => {
    renderDashboardComponent();
  });

  test('check weights loaded are shown', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          entry_id: 31,
          user_id: 'User',
          weight: 79,
          creation_time: '2025-10-23 11:58:11',
        },
      ],
    });
    renderDashboardComponent();
    expect(await screen.findByText(/79 kg/)).toBeInTheDocument();
  });

  test('check that a weight can be added and appears in the dashboard', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          entry_id: 31,
          user_id: 'User',
          weight: 79,
          creation_time: '2025-10-23 11:58:11',
        },
      ],
    });
    renderDashboardComponent();
    expect(await screen.findByText(/79 kg/)).toBeInTheDocument();
    const weight = screen.getByTestId('weight');
    fireEvent.change(weight, { target: { value: '80' } });
    const sendWeightButton = screen.getByRole('button');
    expect(sendWeightButton).toBeInTheDocument();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {},
    });
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          entry_id: 32,
          user_id: 'User',
          weight: 80,
          creation_time: '2025-10-23 11:58:11',
        },
        {
          entry_id: 31,
          user_id: 'User',
          weight: 79,
          creation_time: '2025-10-23 11:58:11',
        },
      ],
    });
    fireEvent.click(sendWeightButton);
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith('/api/user-weights?number=100', {
        method: 'GET',
      })
    );
    expect(await screen.findByText(/80/)).toBeInTheDocument();
    expect(await screen.findByText(/79/)).toBeInTheDocument();
  });
});
