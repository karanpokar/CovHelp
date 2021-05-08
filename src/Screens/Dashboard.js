import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

const Dashboard = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <LottieView
          source={require("./../animation/covid-19-protect.json")}
          autoPlay
          loop
        />
      </View>
      <View style={{ flex: 1 }}>
        <LottieView
          source={require("./../animation/2326-coming-soon.json")}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

export default Dashboard;
