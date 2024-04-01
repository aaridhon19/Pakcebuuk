import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { gql, useMutation } from "@apollo/client";

const LIKE_MUTATION = gql`
  mutation Mutation($id: ID!) {
    likePost(_id: $id) {
      username
      createdAt
      updatedAt
    }
  }
`;

const COMMENT_MUTATION = gql`
  mutation Mutation($id: ID!, $content: String!) {
    commentPost(_id: $id, content: $content) {
      content
      username
      createdAt
      updatedAt
    }
  }
`;

function Card({ post, index }) {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(post.liked);
  const [commenting, setCommenting] = useState(false); // State untuk menampilkan input komentar
  const [commentContent, setCommentContent] = useState(""); // State untuk konten komentar yang dimasukkan

  const [likePost] = useMutation(LIKE_MUTATION);
  const [commentPost] = useMutation(COMMENT_MUTATION);

  async function handleDetail() {
    navigation.navigate("Detail", { id: post._id });
  }

  async function handleLike() {
    try {
      await likePost({ variables: { id: post._id } });
      setLiked(true);
    } catch (error) {
      alert(error.message)
    }
  }

  async function handleComment() {
    setCommenting((prevState) => !prevState);
  }

  async function handleSubmitComment() {
    try {
      await commentPost({ variables: { id: post._id, content: commentContent } });
      setCommentContent("");
    } catch (error) {
      alert(error.message)
    }
  }

  const getFormattedDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString();
  };

  return (
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
            <Text style={styles.author}>Adam</Text>
            <Text style={styles.time}>{getFormattedDate(post.createdAt)}</Text>
          </View>
        </View>
        <Text style={styles.content}>{post.content}</Text>
        <Image
          source={{
            uri: `${post.imgUrl}`,
          }}
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLike} style={styles.button}>
            <Icon name="heart" size={20} color={liked ? "red" : "black"} />
            <Text style={[styles.buttonText, { color: liked ? "red" : "black" }]}>
              {post.likes.length} Likes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleComment} style={styles.button}>
            <Icon name="comment" size={20} color="black" />
            <Text style={styles.buttonText}>{post.comments.length} Comments</Text>
          </TouchableOpacity>
        </View>
        {commenting && (
          <View style={styles.commentContainer}>
            <TextInput
              style={styles.commentInput}
              value={commentContent}
              onChangeText={setCommentContent}
              placeholder="Type your comment here..."
            />
            <TouchableOpacity onPress={handleSubmitComment} style={styles.commentSubmit}>
              <Text style={styles.commentSubmitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={post.comments}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Text>{item.content}</Text>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </TouchableOpacity>
    </View>
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
    alignItems: "center",
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
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 4,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  commentSubmit: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  commentSubmitText: {
    color: "white",
  },
  commentItem: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    marginBottom: 4,
  },
});

export default Card;
