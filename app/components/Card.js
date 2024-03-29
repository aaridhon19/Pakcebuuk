import { View } from "react-native";
import { useNavigation } from "react-navigation/native";

function Card({post}) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        elevation: 3,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Image
            syle={{ width: 50, height: 50 }}
            source={{ uri: "image_url" }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
          >
            <Text style={{ fontWeight: "bold" }}>{post.name}</Text>
            <Text style={{ color: "grey" }}>{post.date}</Text>
          </View>
          <Text>{post.description}</Text>
        </View>
      </View>
    </View>
  );
}

export default Card;
