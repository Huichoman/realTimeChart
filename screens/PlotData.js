import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Button,
} from "react-native";

import {
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryClipContainer,
} from "victory-native";

export const PlotData = ({ fbData, sensorData }) => {
  const [chartData, setChartData] = useState([]);

  //   useEffect(() => {
  //     setTimeout(() => {}, 1000);
  //     addData();
  //   }, []);
  //
  useEffect(() => {
    const timer = setTimeout(() => addData(), 1000);
    return () => clearTimeout(timer);
  }, [fbData]);

  const addData = () => {
    let d = [];
    d = [...chartData];
    if (d.length > 0) {
      d.push(fbData[fbData.length - 1]);
      if (d.length > 10) d.shift();
      setChartData([...d]);
    } else {
      if (fbData.length > 20) setChartData(fbData.slice(-10));
      else setChartData([...fbData]);
    }
  };

  return (
    <View style={styles.container}>
      <VictoryChart theme={VictoryTheme.material} height={200}>
        <VictoryLine
          style={{
            data: { stroke: "#078998", strokeWidth: 3 },
            parent: { border: "2px solid #ccc" },
          }}
          data={chartData}
          //   labels={({ datum }) => datum.y}
        />
        <VictoryScatter data={chartData} />
      </VictoryChart>
      <View style={styles.dataValues}>
        <Text style={styles.itemText}>{sensorData.bpm}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  dataValues: {
    backgroundColor: "#0A638E",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
});
