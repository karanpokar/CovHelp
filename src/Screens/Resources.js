import React from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import database from "@react-native-firebase/database";
import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/Fontisto";
import Icons from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
const reference = database().ref("/Resources");

const Resources = () => {
  const [data, setData] = React.useState(null);
  const [refresh, setRefresh] = React.useState(true);
  const [res, setRes] = React.useState("Beds");
  const [city, setCity] = React.useState("India");
  React.useEffect(async () => {
    console.log("Every 1 minute");
    await database()
      .ref(`/${res}`)
      .on("value", (snapshot) => {
        setData(snapshot.val());
        setCity("India");
      });
    // Stop listening for updates when no longer required
  }, [refresh, res]);
  setTimeout(() => {
    setRefresh(!refresh);
  }, 60000);
  if (data != null) {
    var val = Object.keys(data);
    console.log("Data", data);
    console.log("Val", val);
    var dt = [];
    var place = [];
    for (var a in val) {
      var pos = val[a];
      dt.push({ ...data[pos], key: pos });
      place.push({
        label: data[pos]["cityName"],
        value: data[pos]["cityName"],
      });
    }

    var cities = dt.filter(function (item) {
      return item.cityName == city;
    });
    console.log(place);
    console.log("Dt", dt);
  }
  const renderItemRes = ({ item }) => (
    <View
      style={{
        borderColor: "purple",
        borderRadius: 10,
        borderWidth: 2,
        width: Dimensions.get("screen").width - 30,
        alignSelf: "center",
        marginVertical: 5,
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-around",
        }}
      >
        <Text style={{ flex: 0.9 }}>{item["body"]}</Text>
        <LottieView
          style={{ alignSelf: "flex-end", width: 35, height: 35 }}
          source={require("./../animation/verified.json")}
          autoPlay
          loop
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={{ alignSelf: "center", fontSize: 16 }}>
          Verified Date: {item.verifieddate}
        </Text>
        <Text style={{ alignSelf: "center", fontSize: 16 }}>
          Verified Time: {item.verifiedtime}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={{ alignSelf: "center", fontSize: 18 }}>
          City: {item.cityName}
        </Text>
        <Text style={{ alignSelf: "center", fontSize: 18 }}>
          Type: {item.resourcetype}
        </Text>
      </View>
    </View>
  );
  const images = [
    {
      image:
        "https://res.cloudinary.com/dskyiphth/image/upload/v1620471443/CovHelp/beds_dwl3hw.png",
      resource: "Beds",
    },
    {
      image:
        "https://res.cloudinary.com/dskyiphth/image/upload/v1620471442/CovHelp/oxygen_wl4ua6.png",
      resource: "Oxygen",
    },
    {
      image:
        "https://res.cloudinary.com/dskyiphth/image/upload/v1620471444/CovHelp/syringe_nmegmo.png",
      resource: "Medicines",
    },
    {
      image:
        "https://res.cloudinary.com/dskyiphth/image/upload/v1620471442/CovHelp/food_x6cfgj.png",
      resource: "Food",
    },
    {
      image:
        "https://res.cloudinary.com/dskyiphth/image/upload/v1620471442/CovHelp/plasma_einojo.png",
      resource: "Plasma",
    },
  ];
  const renderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        borderColor: "purple",
        borderWidth: 0.5,
        borderRadius: 10,
        marginHorizontal: 5,
      }}
    >
      <TouchableOpacity onPress={() => setRes(item.resource)}>
        <Image
          source={{ uri: `${item.image}` }}
          style={{
            height: 100,
            width: 100,
            alignSelf: "center",
            alignItems: "center",
          }}
        />
        <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
          {item.resource}
        </Text>
      </TouchableOpacity>
    </View>
  );
  if (data == null) {
    return (
      <ScrollView>
        <Text style={{ alignSelf: "center", fontSize: 35, fontWeight: "bold" }}>
          Find Resources
        </Text>

        <View style={{ padding: 20 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={images}
            keyExtractor={(item) => item.resource}
            renderItem={renderItem}
          />
          <LottieView
            style={{ alignSelf: "center", width: 350, height: 350 }}
            source={require("./../animation/Loader.json")}
            autoPlay={false}
            loop={false}
          />
        </View>
      </ScrollView>
    );
  } else if (data != null && city == "India") {
    return (
      <ScrollView>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 35,
            fontWeight: "bold",
          }}
        >
          Find Resources
        </Text>

        <View style={{ paddingVertical: 10, marginBottom: 10 }}>
          <FlatList
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={images}
            keyExtractor={(item) => item.resource}
            renderItem={renderItem}
          />
          <View
            style={{
              borderColor: "purple",
              borderWidth: 2,
              width: Dimensions.get("screen").width - 30,
              borderRadius: 20,
              marginTop: 10,
              alignSelf: "center",
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
              onValueChange={(value) => setCity(value)}
              items={place}
            />
          </View>
          <Text
            style={{ alignSelf: "center", fontSize: 32, marginVertical: 10 }}
          >
            {res} in {city}
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dt}
            keyExtractor={(item) => item.key}
            renderItem={renderItemRes}
          />
        </View>
      </ScrollView>
    );
  } else if (data != null && city != "India") {
    return (
      <ScrollView>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 35,
            fontWeight: "bold",
          }}
        >
          Find Resources
        </Text>

        <View style={{ paddingVertical: 10, marginBottom: 10 }}>
          <FlatList
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={images}
            keyExtractor={(item) => item.resource}
            renderItem={renderItem}
          />
          <View
            style={{
              borderColor: "purple",
              borderWidth: 2,
              width: Dimensions.get("screen").width - 30,
              borderRadius: 20,
              marginTop: 10,
              alignSelf: "center",
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
              onValueChange={(value) => setCity(value)}
              items={place}
            />
          </View>
          <Text
            style={{ alignSelf: "center", fontSize: 32, marginVertical: 10 }}
          >
            {res} in {city}
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={cities}
            keyExtractor={(item) => item.key}
            renderItem={renderItemRes}
          />
        </View>
      </ScrollView>
    );
  }
};

export default Resources;
