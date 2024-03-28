import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailScreen';
import RegisterScreen from '../screens/RegisterScreen';
const Stack = createNativeStackNavigator();


function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
            <Stack.Screen name="Home" component={TabNavigator} options={{headerShown: false}} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigator