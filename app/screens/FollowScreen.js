import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_FOLLOW } from "../queries/follow";
import { GET_PROFILE } from "../queries/profile";

function FollowScreen() {

  const { data, loading, error } = useQuery(GET_PROFILE, {
    notifyOnNetworkStatusChange: true,
  });

  console.log({data, loading, error}, "ini di Follow");

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.follows}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.followItem}>
            <Text>{item.name}</Text>
            <Text>@{item.username}</Text>
          </View>
        )}
        ListEmptyComponent={() => <Text>No follows found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  followItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default FollowScreen;
