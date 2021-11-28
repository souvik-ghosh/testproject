/* eslint-disable react-hooks/exhaustive-deps */
// In App.js in a new project
import React, {useEffect, useState, useMemo} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import {getComments, getPosts, getUsers} from './api';
import {AppContext} from './contexts';
import {RootNavigator} from './navigators';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const appState = useMemo(
    () => ({users, posts, comments}),
    [users, posts, comments],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <AppContext.Provider value={appState}>
      <RootNavigator />
    </AppContext.Provider>
  );

  async function fetchAllData() {
    await Promise.all([fetchUsers(), fetchComments(), fetchPosts()]);
    setLoading(false);
  }

  async function fetchUsers() {
    const res = await getUsers();
    setUsers(res ?? []);
  }

  async function fetchPosts() {
    const res = await getPosts();
    setPosts(res ?? []);
  }

  async function fetchComments() {
    const res = await getComments();
    setComments(res ?? []);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
