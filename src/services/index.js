export const endpoint = 'https://opentdb.com/api_token.php?command=request';

export const fetchAPI = async () => {
  const response = await fetch(endpoint);
  const responseJSON = await response.json();
  return responseJSON;
};

export const fetchAPIGame = async () => {
  const token = localStorage.getItem('token');
  const endpointGame = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(endpointGame);
  const responseJSON = await response.json();
  return responseJSON;
};
