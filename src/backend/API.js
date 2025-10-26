// fetch-Aufrufe für alle Endpunkte

// Wirft bei HTTP-Fehlercodes (außer 401) einen Error
// Bei 401 wird die übergebene onUnauthorized-Funktion aufgerufen (die den User ausloggt)
async function fetchAndCheck(url, fetchParams, onUnauthorized) {
  const response = await fetch(url, fetchParams);
  if (!response.ok) {
    if (response.status === 401 && onUnauthorized) {
      onUnauthorized();
      return;
    }
    throw new Error(
      `[${url}] Server responded with an error [${response.status}]`
    );
  }
  return response;
}

// Gewichts-Endpunkte
export const getUserWeights = async (onUnauthorized) => {
  const response = await fetchAndCheck(
    '/api/user-weights?number=100',
    {
      method: 'GET',
    },
    onUnauthorized
  );
  return await response.json();
};

export const postNewWeight = async (userWeight, onUnauthorized) => {
  await fetchAndCheck(
    '/api/user-weights',
    {
      method: 'POST',
      body: JSON.stringify({
        weight: userWeight,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
    onUnauthorized
  );
};

// Login
export const postUserLogin = async (email, password) => {
  const response = await fetchAndCheck(
    '/api/login',
    {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
    () => {
      throw new Error('Could not log in');
    }
  );
  return await response.json();
};

// Kontakt-Formular
export const postMessage = async (title, body, onUnauthorized) => {
  await fetchAndCheck(
    '/api/user-messages',
    {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
    onUnauthorized
  );
};
