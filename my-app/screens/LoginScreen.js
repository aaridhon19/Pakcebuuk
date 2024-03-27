import { Button, View, Text } from "react-native";

function LoginScreen({navigation}) {
    return (
        <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Login Screen</Text>
            <Button title="login" onPress={() => navigation.navigate("Home")} />
        </View>
    )
}

export default LoginScreen;