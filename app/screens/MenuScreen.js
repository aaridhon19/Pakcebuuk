import { Text, View } from "react-native";
import LogoutButton from "../components/LogoutButton";

function MenuScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LogoutButton />
      </View>
    );
  }
  
  export default MenuScreen;