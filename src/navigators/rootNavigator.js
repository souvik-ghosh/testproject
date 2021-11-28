import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PostDetails, PostList, UserDetails, UserList} from '../screens';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PostList"
          options={{title: 'Posts'}}
          component={PostList}
        />
        <Stack.Screen
          name="UserDetails"
          options={{title: 'User Details'}}
          component={UserDetails}
        />
        <Stack.Screen
          name="PostDetails"
          options={{title: 'Post Details'}}
          component={PostDetails}
        />
        <Stack.Screen
          name="UserList"
          options={{title: 'Users'}}
          component={UserList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
