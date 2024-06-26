import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { ActivityIndicator } from "react-native";
import { View, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/auth";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
    }
  }
`;

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setIsSignedIn } = useContext(AuthContext);

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (data) => {
      await SecureStore.setItemAsync("accessToken", data?.login.accessToken);
      setIsSignedIn(true);
    },
  });

  console.log({ data, loading, error });

  async function handleSubmit() {
    try {
      await login({ variables: { username, password } });
    } catch (err) {
      console.log(err.message, "<<<<<< ini login");
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <View style={{ padding: 10, gap: 15 }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                color: "#0056FE",
                marginBottom: 30,
              }}
            >
              pakcebukk
            </Text>
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <View>
            <TouchableOpacity
              title="Log In"
              onPress={handleSubmit}
              style={{
                backgroundColor: "#0339F9",
                padding: 10,
                borderRadius: 5,
                marginEnd: 20,
                marginTop: 10,
                marginStart: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#0266FB" }}>Forgotten Password?</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "#000",
              alignContent: "center",
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
              marginEnd: 20,
              marginStart: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                top: 9,
                backgroundColor: "#F0F0F0",
                paddingHorizontal: 10,
              }}
            >
              OR
            </Text>
          </View>
          <View>
            <TouchableOpacity
              title="Create New Account"
              onPress={() => navigation.navigate("Register")}
              style={{
                backgroundColor: "#07A717",
                padding: 10,
                borderRadius: 5,
                margin: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Create New Account
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text>About </Text>
            <Text> Help </Text>
            <Text> More</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ opacity: 0.5 }}>@mathe 2024</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
  },

  inputGroup: {
    gap: 5,
    backgroundColor: "#F8F0F0",
    marginEnd: 20,
    marginStart: 20,
  },
});
export default LoginScreen;
