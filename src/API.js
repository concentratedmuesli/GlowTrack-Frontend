// TODO: navigate to login if anything return 401

async function fetchAndCheck(url, fetchParams, onUnauthorized) {
  const response = await fetch(url, fetchParams);
  if (!response.ok) {
    if (response.status === 401) {
      onUnauthorized();
      return;
    }
    throw new Error(
      `[${url}] Server responded with an error [${response.status}]`
    );
  }
  return response;
}

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
