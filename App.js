/* eslint-disable react-hooks/exhaustive-deps */
// In App.js in a new project

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostList from './src/screens/postList';
import UserDetails from './src/screens/userDetails';
import {getComments, getPosts, getUsers} from './src/api';
import PostDetails from './src/screens/postDetails';
import UserList from './src/screens/userList';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PostList" options={{title: 'Posts'}}>
          {props => <PostList posts={posts} users={users} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="UserDetails" options={{title: 'User'}}>
          {props => <UserDetails users={users} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="PostDetails" options={{title: 'Post Details'}}>
          {props => (
            <PostDetails
              posts={posts}
              users={users}
              comments={comments}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="UserList" options={{title: 'Users'}}>
          {props => <UserList users={users} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );

  async function fetchAllData() {
    await fetchUsers();
    await fetchPosts();
    await fetchComments();
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
