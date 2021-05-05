import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Picker from './VaccineScreens/Picker';
import VaccineSlot from './VaccineScreens/VaccineSlot';
import {createStackNavigator} from '@react-navigation/stack';


const StackList = createStackNavigator();

const Vaccine = () => {
  return (
    <NavigationContainer independent={true}>
      <StackList.Navigator>
        <StackList.Screen
          name="Picker"
          component={Picker}
          options={{headerShown: false}}
        />
        <StackList.Screen
          name="VaccineSlot"
          component={VaccineSlot}
          options={{headerShown: false}}
        />
      </StackList.Navigator>
    </NavigationContainer>
  );
};

export default Vaccine;
