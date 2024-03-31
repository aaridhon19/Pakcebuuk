import { useContext } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import AuthContext from "../context/auth";
import * as SecureStore from "expo-secure-store";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function LogoutButton() {
  const { setIsSignedIn, isSignedIn } = useContext(AuthContext);

  return (
    <View style={{ alignContent: "center" }}>
      <TouchableOpacity
      style={{marginStart:4}}
        onPress={async () => {
          await SecureStore.deleteItemAsync("accessToken");
          setIsSignedIn(false);
        }}
      >
        <MaterialCommunityIcons name="logout-variant" color={"#0266FB"} size={40} />
      </TouchableOpacity>
      <Text style={{ color: "#0266FB", fontWeight: "bold" }}>Logout</Text>
    </View>
  );
}

export default LogoutButton;
