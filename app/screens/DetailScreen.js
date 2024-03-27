import { Button, Text, View } from "react-native";

function DetailScreen({navigation}) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Detail Screen</Text>
            <Button title="Go back" onPress={() => navigation.push("Detail")} />
        </View>
    )
}

export default DetailScreen;