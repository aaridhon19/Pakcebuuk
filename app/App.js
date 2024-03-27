import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigators/StackNavigator';

function App() {
  return (

    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}

export default App;