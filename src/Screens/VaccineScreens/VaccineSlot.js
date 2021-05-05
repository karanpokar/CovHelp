import React from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import LottieView from "lottie-react-native";

const VaccineSlot = ({ route }) => {
  const [id, setId] = React.useState(route.params.item.state_id);
  const [districts, setDistricts] = React.useState(null);
  const [dst, setDst] = React.useState(null);
  const [slots, setSlots] = React.useState(null);
  React.useEffect(() => {
    async function getDistricts() {
      await axios
        .get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`)
        .then((response) => {
          console.log(JSON.stringify(response.data.districts));
          setDistricts(response.data.districts);
        })
        .catch((error) => console.log(error));
    }
    getDistricts();
  }, [id]);
  React.useEffect(() => {
    async function getSlots() {
      await axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${dst}&date=${dt}`
        )
        .then((response) => {
          console.log(JSON.stringify(response.data.sessions));
          setSlots(response.data.sessions);
        })
        .catch((error) => console.log(error));
    }
    getSlots();
  }, [dst]);
  var d = new Date();
  var dt = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  if (districts != null) {
    var data = [];
    for (var i in districts) {
      //console.log('For', districts[i]);
      data.push({
        label: districts[i]["district_name"],
        value: districts[i]["district_id"],
      });
    }
    console.log(data);
  }
  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
  if (districts == null) {
    return (
      <View>
        <Text>Vaccine Slot</Text>
      </View>
    );
  } else if (dst == null && districts != null) {
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>
          Select District to See Available Slots
        </Text>
        <View
          style={{
            borderColor: "purple",
            borderWidth: 2,
            width: Dimensions.get("screen").width - 30,
            borderRadius: 20,
            backgroundColor: "black",
          }}
        >
          <RNPickerSelect
            style={{
              fontSize: 16,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderWidth: 0.5,
              borderColor: "purple",
              borderRadius: 8,
              color: "black",
              paddingRight: 30,
            }}
            onValueChange={(value) => setDst(value)}
            items={data}
          />
        </View>
        <View style={{ flex: 0.5, alignItems: "center", marginTop: 20 }}>
          <Text>{dt}</Text>
          <LottieView
            style={{ height: 300 }}
            source={require("./../../animation/Loader.json")}
            autoPlay
            loop
          />
        </View>
      </View>
    );
  } else if (dst != null && districts != null && slots == null) {
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>
          Select District to See Available Slots
        </Text>
        <View
          style={{
            borderColor: "purple",
            borderWidth: 2,
            width: Dimensions.get("screen").width - 30,
            borderRadius: 20,
            backgroundColor: "black",
          }}
        >
          <RNPickerSelect
            style={{
              fontSize: 16,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderWidth: 0.5,
              borderColor: "purple",
              borderRadius: 8,
              color: "black",
              paddingRight: 30,
            }}
            onValueChange={(value) => setDst(value)}
            items={data}
          />
        </View>
        <View>
          <View style={{ flex: 0.5, alignItems: "center", marginTop: 20 }}>
            <Text>{dt}</Text>
            <LottieView
              style={{ height: 300 }}
              source={require("./../../animation/Loader.json")}
              autoPlay
              loop
            />
          </View>
        </View>
      </View>
    );
  } else if (dst != null && districts != null && slots != null) {
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>
          Select District to See Available Slots
        </Text>
        <View
          style={{
            flex: 0.1,
            borderColor: "purple",
            borderWidth: 2,
            width: Dimensions.get("screen").width - 30,
            borderRadius: 20,
            backgroundColor: "black",
          }}
        >
          <RNPickerSelect
            style={{
              fontSize: 16,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderWidth: 0.5,
              borderColor: "purple",
              borderRadius: 8,
              color: "black",
              paddingRight: 30,
            }}
            onValueChange={(value) => setDst(value)}
            items={data}
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <FlatList
            style={{ flex: 1 }}
            data={slots}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.center_id}
            renderItem={renderItem}
          />
        </View>
      </View>
    );
  }
};

export default VaccineSlot;
