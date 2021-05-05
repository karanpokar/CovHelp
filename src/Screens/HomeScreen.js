import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Dashboard from './Dashboard';
import Vaccine from './Vaccine';
import Resources from './Resources';
import Contribute from './Contribute';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Resources"
      activeColor="white"
      inactiveColor="grey"
      barStyle={{backgroundColor: '#222E6B'}}>
      <Tab.Screen
        name="Resources"
        component={Resources}
        options={{
          tabBarLabel: 'Resources',
          tabBarIcon: () => (
            <Icon name="medical-bag" color={'white'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Vaccine"
        component={Vaccine}
        options={{
          tabBarLabel: 'Vaccine',
          tabBarIcon: () => <Font name="syringe" color={'white'} size={26} />,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: () => <Icon name="chart-bar" color={'white'} size={26} />,
        }}
      />
      <Tab.Screen
        name="Contribute"
        component={Contribute}
        options={{
          tabBarLabel: 'Contribute',
          tabBarIcon: () => <Icon name="plus" color={'white'} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
}

const Main = () => {
  return (
    <NavigationContainer independent={true}>
      <MyTabs />
    </NavigationContainer>
  );
};

export default Main;
