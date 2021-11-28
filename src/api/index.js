const baseUrl = 'https://jsonplaceholder.typicode.com';

export const get = async endpoint => {
  try {
    const response = await fetch(baseUrl + endpoint);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getPosts = async () => {
  return await get('/posts');
};

export const getUsers = async () => {
  return await get('/users');
};

export const getComments = async () => {
  return await get('/comments');
};
