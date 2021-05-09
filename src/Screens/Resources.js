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
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";

const Resources = () => {
  const [data, setData] = React.useState(null);
  const [refresh, setRefresh] = React.useState(true);
  const [res, setRes] = React.useState("Beds");
  const [city, setCity] = React.useState("India");
  React.useEffect(async () => {
    //Use Effect to fetch Data from Firebase, will trigger everytime res and refresh value changes
    console.log("After 1 minute");
    await database()
      .ref(`/${res}`)
      .orderByValue("reversetoken")
      .on("value", (snapshot) => {
        setData(snapshot.val());
        setCity("India");
        console.log("Data from Firebase", snapshot.val());
      });
  }, [res, refresh]);
  setTimeout(() => {
    setRefresh(!refresh);
  }, 60000);

  //After getting the Data from Firebase

  if (data != null) {
    var val = Object.keys(data);
    console.log("Data", data);
    console.log("Val", val);
    var dt = [];
    var place = [];
    //Preprocesing Card Data
    for (var a in val) {
      var pos = val[a];
      dt.push({ ...data[pos], key: pos });
      dt = dt.sort((a, b) => a.reversetoken - b.reversetoken);
      place.push(data[pos]["cityName"]);
    }
    console.log("Place", place);
    place = new Set(place);
    // Preprocessing Pickerdata
    var pickerData = [];
    for (var a of place) {
      pickerData.push({
        label: a,
        value: a,
        color: "white",
      });
    }
    var cities = dt.filter(function (item) {
      return item.cityName == city;
    });
    cities = cities.sort((a, b) => a.reversetoken - b.reversetoken);
    console.log("Pickerdata", pickerData);
  }
  const placeholder = {
    label: city,
    value: city,
    color: "white",
  };
  //Render Item for Card
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
        <Text style={{ flex: 0.9, fontWeight: "bold", fontSize: 15 }}>
          {item["body"]}
        </Text>
        <LottieView
          style={{ alignSelf: "flex-end", width: 35, height: 35 }}
          source={require("./../animation/verified.json")}
          autoPlay
          loop
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={{ alignSelf: "center", fontSize: 16, flex: 1 }}>
          Verified Date: {item.verifieddate}
        </Text>
        <Text style={{ alignSelf: "center", fontSize: 16, flex: 1 }}>
          Verified Time:{item.verifiedtime}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={{ alignSelf: "center", fontSize: 18, flex: 1 }}>
          City: {item.cityName}
        </Text>
        <Text style={{ alignSelf: "center", fontSize: 18, flex: 1 }}>
          Type: {item.resourcetype}
        </Text>
      </View>
    </View>
  );
  //Images for Resource Slider
  const images = [
    {
      image:
        "https://res.cloudinary.com/dskyiphth/image/upload/v1620480040/Travel/hospital-bed_vxw7io.png",
      resource: "Beds",
    },
    {
      image:
        "https://res.cloudinary.com/dskyiphth/image/upload/v1620480192/Travel/oxygen_cbv9il.png",
      resource: "Oxygen",
    },
    {
      image:
        "https://res.cloudinary.com/dskyiphth/image/upload/v1620480135/Travel/medicine_qyblfc.png",
      resource: "Medicines",
    },
    {
      image:
        "https://res.cloudinary.com/dskyiphth/image/upload/v1620480226/Travel/blood-test_ale8xy.png",
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
      <TouchableOpacity
        style={{ width: 110, height: 110, justifyContent: "space-around" }}
        onPress={() => setRes(item.resource)}
      >
        <Image
          source={{ uri: `${item.image}` }}
          style={{
            height: 80,
            width: 80,
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
        <Text
          style={{
            alignSelf: "center",
            fontSize: 35,
            fontWeight: "bold",
            fontFamily: "ComicSans",
          }}
        >
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
              borderColor: "black",
              borderWidth: 2,
              width: Dimensions.get("screen").width - 30,
              borderRadius: 20,
              marginTop: 10,
              alignSelf: "center",
              backgroundColor: "purple",
            }}
          >
            <RNPickerSelect
              placeholder={placeholder}
              style={{
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 0.5,
                borderColor: "purple",
                borderRadius: 8,
                color: "blue",
                paddingRight: 30,
              }}
              onValueChange={(value) => setCity(value)}
              items={pickerData}
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
            keyExtractor={(item) => item.reversetoken}
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
              borderColor: "black",
              borderWidth: 2,
              width: Dimensions.get("screen").width - 30,
              borderRadius: 20,
              marginTop: 10,
              alignSelf: "center",
              backgroundColor: "purple",
            }}
          >
            <RNPickerSelect
              placeholder={placeholder}
              style={{
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 0.5,
                borderColor: "purple",
                borderRadius: 8,
                color: "blue",
                paddingRight: 30,
              }}
              onValueChange={(value) => setCity(value)}
              items={pickerData}
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
            keyExtractor={(item) => item.reversetoken}
            renderItem={renderItemRes}
          />
        </View>
      </ScrollView>
    );
  }
};

export default Resources;
