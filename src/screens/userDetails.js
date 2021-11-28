import React from 'react';
import {Text, SafeAreaView, StyleSheet, View} from 'react-native';

function UserDetails(props) {
  const {route, users} = props;
  const {userId} = route.params;
  const user = users.find(({id}) => id === userId);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Username: <Text style={styles.value}>{user.username}</Text>
        </Text>
        <Text style={styles.title}>
          Name: <Text style={styles.value}>{user.name}</Text>
        </Text>
        <Text style={styles.title}>
          Email: <Text style={styles.value}>{user.email}</Text>
        </Text>
        <Text style={styles.title}>
          Website: <Text style={styles.value}>{user.website}</Text>
        </Text>
        <Text style={styles.title}>
          Company:{' '}
          <Text style={styles.value}>
            {Object.values(user.company).join(', ')}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    paddingVertical: 8,
    fontWeight: 'bold',
  },
  value: {
    fontWeight: 'normal',
  },
});

export default UserDetails;
