import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import MaterialCommunityIcons from'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#621ff7',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',  
      }
    }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
        title: 'HomeScreen',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
        title: 'ProfileScreen',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  )
}

export default TabNavigator;
