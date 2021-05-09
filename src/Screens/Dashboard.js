import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import LottieView from "lottie-react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Entypo";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
const Dashboard = () => {
  const [totaldata, setTotaldata] = React.useState(null);
  const [times, setTimes] = React.useState(null);
  React.useEffect(async () => {
    await axios
      .get(
        "https://corona.lmao.ninja/v2/countries/India?yesterday&strict&query"
      )
      .then((response) => {
        console.log(response.data);
        setTotaldata(response.data);
      })
      .catch((error) => console.log("Error", error));
  }, []);
  React.useEffect(async () => {
    await axios
      .get("https://corona.lmao.ninja/v2/historical?lastdays=10")
      .then((res) => {
        setTimes(res.data[147]);
      })
      .catch((error) => console.log("Error", error));
  }, []);
  var ringdata = null;
  var lineData = null;
  var label = [];
  var dataline = [];
  if (times != null) {
    label = Object.keys(times["timeline"]["cases"]);
    for (var a in label) {
      label[a] = label[a].split("/21");
    }
    for (var j in times["timeline"]["cases"]) {
      dataline.push(times["timeline"]["cases"][j]);
    }
  }
  if (totaldata != null) {
    console.log("Total Data", totaldata);
    var total = totaldata.cases;
    var active = totaldata.active;
    var recovered = totaldata.recovered;
    var death = totaldata.deaths;

    ringdata = {
      labels: ["Death", "Active", "Recovered", "Total"], // optional
      data: [death / total, active / total, recovered / total, total / total],
    };
  }

  if (totaldata != null) {
    return (
      <ScrollView>
        <View
          style={{
            width: Dimensions.get("screen").width,
            alignItems: "center",
          }}
        >
          <Text
            style={{ alignSelf: "center", fontSize: 30, fontWeight: "bold" }}
            adjustsFontSizeToFit={true}
          >
            Covid 19 India Dashboard
          </Text>
          <LineChart
            data={{
              labels: label,
              datasets: [
                {
                  data: dataline,
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={250}
            padding={20}
            style={{ flex: 1, padding: 20, alignSelf: "center" }}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 0,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 0,
              flex: 1,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",

            alignSelf: "center",
            borderRadius: 20,
            width: Dimensions.get("screen").width - 40,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,

            elevation: 17,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                padding: 20,
              }}
            >
              <Text
                style={{
                  color: "lightgreen",
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                Recovered
              </Text>
              <View>
                <Text
                  style={{
                    color: "lightgreen",
                    fontSize: 28,
                    fontWeight: "bold",
                  }}
                >
                  {totaldata.recovered}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "lightgreen",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    + {totaldata.todayRecovered}
                  </Text>
                  <Icon name="arrow-up" size={20} color="lightgreen" />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                padding: 20,
              }}
            >
              <Text
                style={{ color: "orange", fontSize: 28, fontWeight: "bold" }}
              >
                Active Case
              </Text>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{ color: "orange", fontSize: 28, fontWeight: "bold" }}
                >
                  {totaldata.active}
                </Text>
                <Text
                  style={{ color: "orange", fontSize: 18, fontWeight: "bold" }}
                >
                  + {totaldata.todayCases}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                padding: 20,
              }}
            >
              <Text style={{ color: "red", fontSize: 28, fontWeight: "bold" }}>
                Death
              </Text>

              <Text style={{ color: "red", fontSize: 28, fontWeight: "bold" }}>
                {totaldata.deaths}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, width: Dimensions.get("screen").width }}>
          <ProgressChart
            style={{ borderRadius: 10, alignSelf: "flex-start" }}
            data={ringdata}
            width={Dimensions.get("screen").width}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={{
              backgroundColor: "white",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            hideLegend={false}
          />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>Loading.....</Text>
      </View>
    );
  }
};

export default Dashboard;
