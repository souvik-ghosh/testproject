import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

function PostList(props) {
  const {navigation, posts, users} = props;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.link} onPress={navigateToUserList}>
        Users
      </Text>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );

  function renderPost({item}) {
    const {id, userId} = item;
    const user = users.find(u => u.id === userId);

    return (
      <TouchableOpacity onPress={() => navigateToPostDetails(id)}>
        <View style={styles.item}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text
            style={styles.username}
            numberOfLines={1}
            onPress={() => navigateToUserDetails(userId)}>
            {user?.username}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function navigateToUserDetails(userId) {
    navigation.navigate('UserDetails', {userId});
  }

  function navigateToUserList() {
    navigation.navigate('UserList');
  }

  function navigateToPostDetails(postId) {
    navigation.navigate('PostDetails', {postId});
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
});

export default PostList;
