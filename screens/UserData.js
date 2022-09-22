import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";

import { db, auth } from "../firebase";

let dataRef = db.ref("/users");

const UserData = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [edad, setEdad] = useState("");
  const [fbData, setFbData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    }
  }, [fbData]);

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
      <Text style={styles.validationMsgText}>Datos del usuario</Text>
      {!isLoading && <Text style={styles.validationMsgText}>{name}</Text>}
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
    backgroundColor: "#222831",
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#222831",
    minWidth: "80%",
    backgroundColor: "red",
  },
  inputContainer: {
    width: "80%",
    backgroundColor: "#222831",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    // backgroundColor: "#198fc2",
    backgroundColor: "#30475E",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "#30475E",
    marginTop: 5,
    borderColor: "#BBBBBB",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#DDDDDD",
    fontWeight: "700",
    fontSize: 18,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 15,
  },
  validationMsgText: {
    color: "#FA7D09",
    fontWeight: "400",
    fontSize: 15,
  },
  dropDownContainer: {
    width: "100%",
  },
});
