import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Card({ post, index }) {
  const navigation = useNavigation();
  async function handleDetail() {
    navigation.navigate("Detail", { id: post._id });
  }
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleDetail}>
          <View style={styles.header}>
            <Image
              source={{
                uri: `https://source.unsplash.com/random/300x200?sig=${index}`,
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.author}>{post.author}</Text>
              <Text style={styles.time}>{post.createdAt}</Text>
            </View>
          </View>
          <Text style={styles.content}>{post.content}</Text>
          <Image
            source={{
              uri: `https://source.unsplash.com/random/300x200?sig=${index}`,
            }}
            style={styles.image}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => handleLike(index)}
              style={styles.likeButton}
            >
              <Icon
                name="heart"
                size={24}
                color={post.liked ? "red" : "black"}
              />
              <Text> {post.likes.length} Likes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleComment(index)}
              style={styles.commentButton}
            >
              <Icon name="comment" size={24} color="black" />
              <Text> {post.comments.length} Comments</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignposts: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#555",
  },
  content: {
    fontSize: 14,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  likeButton: {
    flexDirection: "row",
    alignposts: "center",
    marginRight: 16,
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Card;
