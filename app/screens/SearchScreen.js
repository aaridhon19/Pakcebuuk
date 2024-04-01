import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_SEARCH } from "../queries/search";
import { MaterialIcons } from "@expo/vector-icons";

const FOLLOW_MUTATION = gql`
  mutation Mutation($followingId: ID!) {
    followUser(followingId: $followingId) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;

function SearchScreen({ navigation }) {
  const [searchUser, setSearchUser] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data, loading, error, refetch } = useQuery(GET_SEARCH, {
    variables: {
      name: searchUser,
      username: searchUser,
    },
    notifyOnNetworkStatusChange: true,
    skip: searchUser.length < 1,
  });

  console.log({data, loading, error}, "GET_SEARCH");;

  const [follow, setFollow] = useState(false);

  const [followUser] = useMutation(FOLLOW_MUTATION, {
    onCompleted: () => {
      refetch();
      setFollow(true);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleFollowUser = async (item) => {
    try {
      await followUser({ variables: { followingId : item } });
    } catch (error) {
      alert(error.message)
    }
  };

  useEffect(() => {
    if (follow) {
      setFollow(false);
    }
    if (searchUser) {
      setSearchResults(data?.searchByUsernameOrName || []);
    } else {
      setSearchResults([]);
    }
  }, [data, searchUser, follow, refetch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => navigation.navigate("ProfileScreen", { followingId: item._id })}
    >
      <View style={styles.userInfo}>
        <Text style={styles.name}>
          {item.name} (@{item.username})
        </Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.followButton}
        onPress={() => handleFollowUser(item._id)}
      >
        <Text style={styles.followText}>Follow</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or username"
        value={searchUser}
        onChangeText={setSearchUser}
        autoCapitalize="none"
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  followButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  followText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SearchScreen;
