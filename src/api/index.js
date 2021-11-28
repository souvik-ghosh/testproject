const baseUrl = 'https://jsonplaceholder.typicode.com';

export const get = async endpoint => {
  try {
    const response = await fetch(baseUrl + endpoint);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getPosts = async () => {
  const response = await get('/posts');
  return response;
};

export const getUsers = async () => {
  const response = await get('/users');
  return response;
};

export const getComments = async () => {
  const response = await get('/comments');
  return response;
};
