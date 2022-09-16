import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import { auth, db } from "../firebase";

import { LineChart } from "react-native-chart-kit";
// import { WebView } from "react-native-webview";
// import ChartView from "react-native-highcharts";

let dataRef = db.ref("/temp");

const HomeScreen = () => {
  const [fbData, setFbData] = useState([]);
  const [chartLabels, setChartLabels] = useState([1]);
  const [chartData, setChartData] = useState([1]);

  useEffect(() => {
    dataRef.on("value", (snapshot) => {
      let data = snapshot.val();
      let values = Object.values(data);
      setFbData(values);
    });
  }, []);

  useEffect(() => {
    let data = [];
    let labels = [];
    fbData.map((item, index) => {
      data.push(item.value);
      labels.push(item.time);
    });
    if (data) {
      setChartLabels(labels);
      setChartData(data);
    }
  }, [fbData]);

  {
    fbData.map((item, index) => {
      return (
        <View key={index}>
          <Text style={styles.itemText}>{item.value + " " + item.time}</Text>
        </View>
      );
    });
  }

  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          //   labels: ["January", "February", "March", "April", "May", "June"],
          labels: chartLabels,
          datasets: [
            {
              //   data: [20, 45, 28, 80, 99, 43],
              data: chartData,
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get("window").width - 16}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <Text>{chartData}</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      {/* {fbData.map((item, index) => {
        return (
          <View key={index}>
            <Text style={styles.itemText}>{item.value + " " + item.time}</Text>
          </View>
        );
      })} */}
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  itemText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
});
