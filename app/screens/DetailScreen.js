import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_POSTS_BY_ID } from "../queries/postById";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function DetailScreen({ route, navigation }) {
  const { id } = route.params;

  const { data, loading, error } = useQuery(GET_POSTS_BY_ID, {
    variables: { id },
  });

  console.log({ data, loading, error });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const post = data?.post;

  const getFormattedDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString();
  };

  return (
    <View style={{flex:1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="close-circle"
            color={"#000"}
            size={23}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image source={{ uri: post.imgUrl }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{post.content}</Text>
          <Text style={styles.tags}>{post.tags}</Text>
          <Text style={styles.like}>{post.likes.length} Likes</Text>
          {/* <Text style={styles.author}>Author: {post.authors.name} (@{post.authors.username})</Text> */}
          <Text style={styles.time}>
            Posted on: {getFormattedDate(post.createdAt)}
          </Text>
        </View>
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>Comments</Text>
          <FlatList
            data={post.comments}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentContent}>{item.content}</Text>
                <Text style={styles.commentInfo}>
                  By: {item.username} | {getFormattedDate(item.createdAt)}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.createdAt.toString()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
  contentContainer: {
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  tags: {
    fontStyle: "italic",
    marginBottom: 10,
  },
  like: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  author: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  time: {
    color: "gray",
  },
  commentsContainer: {
    flex: 1,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
  },
  commentContent: {
    marginBottom: 5,
  },
  commentInfo: {
    color: "gray",
  },
  header: {
    marginTop:20,
    marginStart: 20,
  },
});

export default DetailScreen;
