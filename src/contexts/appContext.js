import {createContext} from 'react';

export const AppContext = createContext({
  users: [],
  posts: [],
  comments: [],
});
