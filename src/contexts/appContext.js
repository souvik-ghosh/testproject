import {createContext, useContext} from 'react';

export const AppContext = createContext({
  users: [],
  posts: [],
  comments: [],
});

export const useAppContext = () => useContext(AppContext);
