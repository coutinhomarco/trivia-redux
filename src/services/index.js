export const endpoint = 'https://opentdb.com/api_token.php?command=request';

export const fetchAPI = async () => {
  const response = await fetch(endpoint);
  const responseJSON = await response.json();
  return responseJSON;
};
