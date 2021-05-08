import React from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import database from "@react-native-firebase/database";
import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/Fontisto";
import Icons from "react-native-vector-icons/Ionicons";
const reference = database().ref("/Resources");

function Contribute() {
  const [data, setData] = React.useState(null);
  const [refresh, setRefresh] = React.useState(true);
  React.useEffect(async () => {
    console.log("Every 1 minute");
    await database()
      .ref(`/Beds`)
      .on("value", (snapshot) => {
        setData(snapshot.val());
      });
    // Stop listening for updates when no longer required
  }, [refresh]);
  setTimeout(() => {
    setRefresh(!refresh);
  }, 60000);

  if (data != null) {
    var val = Object.keys(data);
    console.log("Data", data);
    console.log("Val", val);
    var dt = [];
    for (var a in val) {
      var pos = val[a];
      dt.push({ ...data[pos], key: pos });
    }

    console.log("Dt", dt);
  }
  const renderItem = ({ item }) => (
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
        <Text style={{ alignSelf: "center" }}>
          Verified Date: {item.verifieddate}
        </Text>
        <Text style={{ alignSelf: "center" }}>
          Verified Time: {item.verifiedtime}
        </Text>
        <Icon name="bed-patient" size={32} />
      </View>
    </View>
  );

  if (data != null) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 30,
        }}
      >
        <View
          style={{
            height: 45,
            width: Dimensions.get("screen").width,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <Icons name="arrow-back" size={30} />

          <Text style={{ fontSize: 25 }}>Beds in Maharashtra</Text>
          <Icons name="add-circle-outline" size={30} />
        </View>
        <FlatList
          data={dt}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading Resources</Text>
      </View>
    );
  }
}
export default Contribute;
