import { useContext } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

function LogoutButton() {
  const { setIsSignedIn, isSignedIn } = useContext(AuthContext);

  return (
    <TouchableOpacity>
      <Text
        style={{ color: utilities.color.primary, fontWeight: "bold" }}
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
