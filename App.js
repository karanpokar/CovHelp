import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InitialScreen from './src/Screens/InitialScreen';
import HomeScreen from './src/Screens/HomeScreen';

const StackList = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StackList.Navigator>
        <StackList.Screen
          name="InitialScreen"
          component={InitialScreen}
          options={{headerShown: false}}
        />
        <StackList.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </StackList.Navigator>
    </NavigationContainer>
  );
};

export default App;
