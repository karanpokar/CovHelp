import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';

const InitialScreen = ({navigation}) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 40,
        paddingBottom: 40,
      }}>
      <View>
        <Text style={{fontSize: 64, fontWeight: 'bold', alignSelf: 'center'}}>
          CovHelp
        </Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>
          An Initiative by India's Volunteers
        </Text>
      </View>
      <LottieView
        source={require('./../animation/Initial.json')}
        autoPlay
        loop
      />
      <View style={{justifyContent: 'space-around', flex: 0.3}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            width: 180,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#222E6B',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Get Resources
          </Text>
        </TouchableOpacity>
        <Text style={{alignSelf: 'center', fontSize: 16}}>
          Made in 🇮🇳 with 🤞
        </Text>
      </View>
    </View>
  );
};

export default InitialScreen;
