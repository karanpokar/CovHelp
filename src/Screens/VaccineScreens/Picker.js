import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import LottieView from "lottie-react-native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
//import data from './../JSON/Remdesivir-Distributor-List.json';
const download = ({ navigation }) => {
  const [states, setStates] = useState(null);
  const [val, setVal] = useState("");
  //console.log(JSON.stringify(data));
  useEffect(() => {
    async function getStates() {
      await axios
        .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
        .then((data) => {
          console.log(JSON.stringify(data.data.states));
          setStates(data.data.states);
        })
        .catch((error) => console.log(error));
    }
    getStates();
  }, []);
  function onPressHandler(item) {
    setVal(item);
    alert(item.state_name);
    console.log(val.state_name);
  }
  const handlePress = () => {
    Linking.openURL("https://www.cowin.gov.in/");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.states_id}
      onPress={() => navigation.navigate("VaccineSlot", { item })}
      style={{
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        width: Dimensions.get("screen").width - 50,
        height: 50,
        borderRadius: 5,
        marginVertical: 10,
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#7F75C3",
      }}
    >
      <Text
        key={item.states_id}
        style={{ fontSize: 20, alignSelf: "center", color: "white" }}
      >
        {item.state_name}
      </Text>
    </TouchableOpacity>
  );
  if (states != null) {
    return (
      <View style={styles.container}>
        <FlatList
          data={states}
          keyExtractor={(item) => item.states_id}
          renderItem={renderItem}
        />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../animation/covid-19-protect.json")}
            autoPlay
            loop
          />
        </View>
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../animation/2326-coming-soon.json")}
            autoPlay
            loop
          />
        </View>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: "orange",
            borderRadius: 5,
          }}
          onPress={() => handlePress()}
        >
          <Text style={{ color: "white", fontSize: 26 }}>Get Vaccine Info</Text>
        </TouchableOpacity>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default download;
