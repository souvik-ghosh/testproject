import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDebounce} from '../utils/hooks';

function UserList(props) {
  const {navigation, users} = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        const res = users.filter(
          u =>
            u.username.includes(debouncedSearchTerm) ||
            u.name.includes(debouncedSearchTerm),
        );
        setResults(res);
      } else {
        setResults(users);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm], // Only call effect if debounced search term changes
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="search users"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={results}
        renderItem={renderUsers}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );

  function renderUsers({item}) {
    const {id} = item;
    const user = users.find(u => u.id === id);

    return (
      <TouchableOpacity onPress={() => navigateToUserDetails(id)}>
        <View style={styles.item}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <Text numberOfLines={1}>{user.username}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function navigateToUserDetails(userId) {
    navigation.navigate('UserDetails', {userId});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  username: {
    paddingTop: 8,
    color: 'blue',
    alignSelf: 'flex-start',
  },
  link: {
    fontSize: 16,
    paddingVertical: 8,
    marginRight: 20,
    fontWeight: 'bold',
    color: 'blue',
    marginLeft: 'auto',
  },
  input: {
    padding: 10,
    margin: 20,
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});

export default UserList;
