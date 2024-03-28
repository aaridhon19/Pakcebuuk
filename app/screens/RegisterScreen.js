import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { ActivityIndicator } from "react-native";
import { View, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const REGISTER_MUTATION = gql`
  mutation Register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      email
      password
    }
  }
`;

function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

  async function handleSubmit() {
    try {
      await register({ variables: { name, username, email, password } });
      navigation.navigate("Login");
    } catch (err) {
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
              onChange={setName}
              value={name}
              placeholder="Name"
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              onChange={setUsername}
              value={username}
              placeholder="Username"
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              onChange={setEmail}
              value={email}
              placeholder="Email"
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChange={setPassword}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <View>
            <TouchableOpacity
              title="Register"
              onPress={handleSubmit}
              style={{
                backgroundColor: "#0339F9",
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
                marginEnd: 20,
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
                Register
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: "#0266FB" }}>Have Account?</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 30,
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
export default RegisterScreen;
