import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
  Dimensions,
} from "react-native";

import { db, auth } from "../firebase";

let dataRef = db.ref("/users");
let sensorsRef = db.ref("/data");
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const UserData = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [edad, setEdad] = useState("");
  const [fbData, setFbData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [genero, setGenero] = useState("");

  useEffect(() => {
    setIsLoading(true);
    dataRef.on("value", (snapshot) => {
      let d = [];
      let data = snapshot.val();
      let values = Object.values(data);
      let lastValuesIndex = values.length - 1;
      //   values.map((item, index) => {
      //     d.push({ x: index, y: item.bpm });
      //   });
      d = values.filter((e) => e.email === auth.currentUser?.email);
      console.log(JSON.stringify(d));
      setFbData(...d);

      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (fbData) {
      setEmail(fbData.email);
      setName(fbData.name);
      setApellidoPaterno(fbData.apellidoPaterno);
      setApellidoMaterno(fbData.apellidoMaterno);
      setGenero(fbData.gender);
      setEdad(fbData.edad);
    }
  }, [fbData]);

  const handleSensorData = () => {
    // sensorsRef.once("value").then((snapshot) => {
    //   console.log("User data: ", snapshot.val());
    // });
    db.ref()
      .child("data")
      .orderByChild("time")
      .startAt("09-16-2022, 21:28:36")
      .endAt("09-19-2022, 20:58:05")
      .once("value")
      .then((snapshot) => {
        console.log("User data: ", snapshot.val());
      });
    console.log("Sensor data");
  };

  //   useEffect(() => {
  //     const unsubscribe = auth.onAuthStateChanged((user) => {
  //       if (user) {
  //         // navigation.replace("Menu");
  //         navigation.navigate("Menu");
  //       }
  //     });

  //     return unsubscribe;
  //   }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSensorData} style={[styles.button]}>
          <Text style={styles.buttonText}>Get Sensor data</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.titleText}>Datos del usuario</Text>
        {!isLoading && (
          <View style={{ alignItems: "center", marginTop: ScreenHeight / 22 }}>
            <Text
              style={styles.dataText}
            >{`${name} ${apellidoPaterno} ${apellidoMaterno}`}</Text>
            <Text style={styles.dataText}>{`${genero}, ${edad} años`}</Text>

            <Text
              style={{ ...styles.dataText, marginTop: 10 }}
            >{`${email}`}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default UserData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dedad2",
  },

  dataContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#198fc2",
    width: "90%",
    minHeight: ScreenHeight / 3,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
  },

  logo: {
    width: 110,
    height: 110,
    marginBottom: 15,
  },
  titleText: {
    color: "#99EAF3",
    fontWeight: "400",
    fontSize: 24,
    marginBottom: 15,
  },
  dataText: {
    color: "white",
    fontWeight: "400",
    fontSize: ScreenWidth / 22,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 50,
  },
  button: {
    backgroundColor: "#198fc2",
    width: ScreenWidth / 2,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: ScreenHeight * 0.005,
  },
  buttonOutline: {
    backgroundColor: "#198fc2",
    marginTop: 5,
    borderColor: "#BBBBBB",
    borderWidth: 2,
    marginTop: ScreenHeight * 0.06,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#DDDDDD",
    fontWeight: "700",
    fontSize: 18,
  },
});
