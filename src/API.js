export const getUserWeights = async () => {
  const response = await fetch('http://localhost:3000/user-weights', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(
      `getUserWeights: Server responded with an error [${response.status}]`
    );
  }
  return await response.json();
};

export const postUserLogin = async (username, password) => {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
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
