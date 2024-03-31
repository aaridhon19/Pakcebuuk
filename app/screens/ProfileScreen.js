import { Button, FlatList, Image, Text, View, StyleSheet } from "react-native";

function ProfileScreen({ navigation, route }) {
    const {username, name} = route.params
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{ uri: "https://images.pexels.com/photos/1759531/pexels-photo-1759531.jpeg?auto=compress&cs=tinysrgb&w=800" }}
        />
        <Text style={styles.username}>{username}</Text>
      </View>
      <FlatList
        // data={posts}
        renderItem={({ item }) => <Text style={styles.post}>{item.text}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  post: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
  },
});

export default ProfileScreen;
