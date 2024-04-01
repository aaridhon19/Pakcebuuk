import { gql, useMutation, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import {
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import Card from "../components/Card";
import { StyleSheet } from "react-native";
import { GET_POSTS } from "../queries/post";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const POST_MUTATION = gql`
  mutation Mutation($content: String!, $tags: [String], $imgUrl: String) {
    addPost(content: $content, tags: $tags, imgUrl: $imgUrl) {
      _id
      content
      tags
      imgUrl
      createdAt
      updatedAt
      authorId
    }
  }
`;

function PostScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  
  const [addPost, { data, loading, error }] = useMutation(POST_MUTATION);

  console.log({ data, loading, error });

  async function handleBack() {
    navigation.navigate("Home");
  }

  async function handlePost() {
    try {
      // Kirim permintaan pembuatan postingan ke backend
      await addPost({
        variables: {
          content,
          imgUrl,
          tag: tags.split(",").map((tag) => tag.trim()), // Memisahkan tag menjadi array
        },
      });
      // Reset input setelah posting berhasil
      setContent("");
      setImgUrl("");
      setTags([]);
      navigation.navigate("Home");
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
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
        <TextInput
          multiline
          numberOfLines={4}
          style={styles.input}
          placeholder="What's on your mind?"
          value={content}
          onChangeText={setContent}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter image URL"
          value={imgUrl}
          onChangeText={setImgUrl}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter tags (comma-separated)"
          value={tags}
          onChangeText={setTags}
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    marginTop: -20,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  postButton: {
    backgroundColor: "#4267B2",
    paddingVertical: 12,
    borderRadius: 5,
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostScreen;
