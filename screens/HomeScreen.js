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
} from "react-native";
import { auth, db } from "../firebase";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryClipContainer,
} from "victory-native";
import { PlotData } from "./PlotData";

let dataRef = db.ref("/temp");

const HomeScreen = () => {
  const [fbData, setFbData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dataRef.on("value", (snapshot) => {
      let d = [];
      let data = snapshot.val();
      let values = Object.values(data);

      values.map((item, index) => {
        d.push({ x: index, y: item.value });
      });

      setFbData(d);
      setIsLoading(false);
    });
  }, []);

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
      {!isLoading && <PlotData fbData={fbData} />}

      {/* <Button onPress={addData} title="Add Earnings" /> */}
      <Text>Email: {auth.currentUser?.email}</Text>
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
