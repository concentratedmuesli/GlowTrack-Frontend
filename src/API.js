// TODO: navigate to login if anything return 401

export const getUserWeights = async () => {
  const response = await fetch('/api/user-weights', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(
      `getUserWeights: Server responded with an error [${response.status}]`
    );
  }
  return await response.json();
};

export const postNewWeight = async (userWeight) => {
  const response = await fetch('/api/user-weights', {
    method: 'POST',
    body: JSON.stringify({
      weight: userWeight,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) {
    throw new Error(`Post request failed with status ${response.status}`);
  }
};

export const postUserLogin = async (email, password) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) {
    throw new Error(
      `postUserLogin: Server responded with an error [${response.status}]`
    );
  }
  return await response.json();
};

export const postMessage = async (title, body) => {
  const response = await fetch('/api/user-messages', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      body: body,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) {
    throw new Error(
      `postMessage: Server responded with an error [${response.status}]`
    );
  }
};
