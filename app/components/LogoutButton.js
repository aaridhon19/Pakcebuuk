import { useContext } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import AuthContext from "../context/auth";
import * as SecureStore from "expo-secure-store";

function LogoutButton() {
  const { setIsSignedIn, isSignedIn } = useContext(AuthContext);

  return (
    <TouchableOpacity>
      <Text
        style={{ color: "#FFF", fontWeight: "bold" }}
        onPress={async () => {
          await SecureStore.deleteItemAsync("accessToken");
          setIsSignedIn(false);
        }}
      >
        Logout
      </Text>
    </TouchableOpacity>
  );
}

export default LogoutButton;
