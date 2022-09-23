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
  Button,
  Image,
} from "react-native";
import { auth, db } from "../firebase";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryClipContainer,
} from "victory-native";
import { PlotData } from "./PlotData";

let dataRef = db.ref("/data");

const HomeScreen = ({ navigation }) => {
  const [fbData, setFbData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  const [tempValue, setTempValue] = useState(0);
  const [spo2Value, setSpo2Value] = useState(0);
  const [bpmValue, setBpmValue] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    dataRef.on("value", (snapshot) => {
      let d = [];
      let data = snapshot.val();
      let values = Object.values(data);
      let lastValuesIndex = values.length - 1;
      values.map((item, index) => {
        d.push({ x: index, y: item.bpm });
      });
      setFbData(d);
      setSensorData(values[lastValuesIndex]);

      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (sensorData) {
      setTempValue(sensorData.temp);
      setSpo2Value(sensorData.spo2);
      setBpmValue(sensorData.bpm);
    }
  }, [fbData, sensorData]);

  // const navigation = useNavigation();
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
      {!isLoading && fbData && (
        <PlotData fbData={fbData} sensorData={sensorData} />
      )}

      <View style={styles.sensorDataContainer}>
        <Text style={styles.sensorMeasurementUnitTitle}>PR</Text>
        <View style={styles.sensorValuecontainer}>
          <Text style={styles.sensorValueText}>{bpmValue}</Text>
          <Text style={styles.sensorMeasurementUnitText}>BPM</Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.sensorMeasurementUnitTitle}>SpO2</Text>
        <View style={styles.sensorValuecontainer}>
          <Text style={styles.sensorValueText}>{spo2Value}</Text>
          <Text style={styles.sensorMeasurementUnitText}>%</Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.sensorMeasurementUnitTitle}>Temp</Text>
        <View style={styles.sensorValuecontainer}>
          <Text style={styles.sensorValueText}>{tempValue}</Text>
          <Text style={styles.sensorMeasurementUnitText}>°C</Text>
        </View>
      </View>

      {/* <Text>Userx: {auth.currentUser?.email}</Text> */}

      {/* <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#dedad2",
  },

  button: {
    backgroundColor: "#198fc2",
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
  logo: {
    width: 58,
    height: 58,
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
