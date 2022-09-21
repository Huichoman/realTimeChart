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
    if (fbData) {
      const timer = setTimeout(() => addData(), 500);
      return () => clearTimeout(timer);
    }
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
      <VictoryChart
        theme={VictoryTheme.material}
        height={250}
        minDomain={{ y: 50 }}
        maxDomain={{ y: 120 }}
      >
        {chartData && fbData && (
          <VictoryLine
            style={{
              data: { stroke: "#078998", strokeWidth: 3 },
              parent: { border: "2px solid #ccc" },
            }}
            data={chartData}
            //   labels={({ datum }) => datum.y}
          />
        )}
        <VictoryScatter data={chartData} />
      </VictoryChart>

      {/* <View style={styles.sensorDataContainer}>
        <Text style={styles.sensorMeasurementUnitTitle}>PR</Text>
        <View style={styles.sensorValuecontainer}>
          <Text style={styles.sensorValueText}>{sensorData.bpm}</Text>
          <Text style={styles.sensorMeasurementUnitText}>BPM</Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.sensorMeasurementUnitTitle}>SpO2</Text>
        <View style={styles.sensorValuecontainer}>
          <Text style={styles.sensorValueText}>{sensorData.spo2}</Text>
          <Text style={styles.sensorMeasurementUnitText}>%</Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.sensorMeasurementUnitTitle}>Temp</Text>
        <View style={styles.sensorValuecontainer}>
          <Text style={styles.sensorValueText}>{sensorData.temp}</Text>
          <Text style={styles.sensorMeasurementUnitText}>°C</Text>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "90%",
  },
  sensorValuecontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "90%",
  },
  sensorDataContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#198fc2",
    width: "90%",
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
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
  sensorValueText: {
    color: "white",
    fontWeight: "700",
    fontSize: 28,
    paddingRight: 10,
  },
  sensorMeasurementUnitText: {
    color: "white",
    fontWeight: "400",
    fontSize: 18,
  },
  sensorMeasurementUnitTitle: {
    color: "#99EAF3",
    fontWeight: "700",
    fontSize: 22,
  },
  horizontalLine: {
    height: 2,
    backgroundColor: "rgba(255, 255, 255 ,0.3)",
    alignSelf: "stretch",
    marginBottom: 15,
  },
});
