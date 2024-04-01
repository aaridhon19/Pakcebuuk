import React from "react";
import {
  Button,
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../queries/profile";
import SearchScreen from "./SearchScreen";
import FollowScreen from "./FollowScreen";

function ProfileScreen({ navigation }) {
  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: { id: "user-id-here" }, // Ganti "user-id-here" dengan ID pengguna yang sesuai
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const profile = data?.findById;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={{
              uri: "https://images.pexels.com/photos/1759531/pexels-photo-1759531.jpeg?auto=compress&cs=tinysrgb&w=800",
            }}
          />
          <Text style={styles.username}>{profile.username}</Text>
        </View>
        <Text style={styles.subheading}>Name: {profile.name}</Text>
        <Text style={styles.subheading}>Email: {profile.email}</Text>
        <Text style={styles.subheading}>Followers:</Text>
        <FlatList
          data={profile.followerDetail}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item.username}</Text>
          )}
          keyExtractor={(item) => item._id}
        />
        <Text style={styles.subheading}>Following:</Text>
        <FlatList
          data={profile.followingDetail}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item.username}</Text>
          )}
          keyExtractor={(item) => item._id}
        />
        <SearchScreen />
        <FollowScreen />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  subheading: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default ProfileScreen;
