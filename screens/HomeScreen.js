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

const HomeScreen = () => {
  const [fbData, setFbData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  const [tempValue, setTempValue] = useState(5);

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
    setTempValue(tempValue + 1);
  }, [fbData]);

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
      <Text>{tempValue}</Text>
      <Text>{tempValue}</Text>
      {/* {!isLoading && <PlotData fbData={fbData} sensorData={sensorData} />} */}

      {/* <Button onPress={addData} title="Add Earnings" /> */}
      <Text>Userx: {auth.currentUser?.email}</Text>

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
    justifyContent: "flex-start",
    alignItems: "center",
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
});
