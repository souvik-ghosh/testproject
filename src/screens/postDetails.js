import React from 'react';
import {Text, SafeAreaView, StyleSheet, View, FlatList} from 'react-native';

function PostDetails(props) {
  const {navigation, route, posts, users, comments: allComments} = props;
  const {postId} = route.params;
  const post = posts.find(({id}) => id === postId);
  const user = users.find(({id}) => id === post.userId);
  const comments = allComments.filter(comment => comment.postId === postId);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text
        style={styles.username}
        onPress={() => navigateToUserDetails(user.id)}>
        {user.username} ({user.name})
      </Text>
      <Text style={styles.body}>{post.body}</Text>
      <View style={styles.commentContainer}>
        <Text style={styles.title}>Comments</Text>
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );

  function renderComment({item}) {
    return (
      <View style={styles.comment}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.commentSecondaryText}>{item.body}</Text>
        <Text numberOfLines={1} style={styles.commentSecondaryText}>
          - {item.email}
        </Text>
      </View>
    );
  }

  function navigateToUserDetails(userId) {
    navigation.navigate('UserDetails', {userId});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    padding: 8,
  },
  body: {
    padding: 8,
    textAlign: 'justify',
  },
  username: {
    fontWeight: 'bold',
    padding: 8,
    color: 'blue',
  },
  comment: {
    backgroundColor: '#fff',
    padding: 8,
    margin: 8,
  },
  commentContainer: {
    flex: 1,
  },
  commentSecondaryText: {
    lineHeight: 18,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});

export default PostDetails;
