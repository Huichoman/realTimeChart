import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { db, auth } from "../firebase";

let dataRef = db.ref("/users");
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

export const Menu = ({ navigation }) => {
  //   const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles.titleText}>Menu</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("User")}
            style={[styles.button]}
          >
            <Text style={styles.buttonText}>Datos del usuario</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={[styles.button]}
          >
            <Text style={styles.buttonText}>Monitorear datos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignOut} style={[styles.button]}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    backgroundColor: "#dedad2",
    width: "90%",
    minHeight: ScreenHeight / 3,
    borderWidth: 0,
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
    color: "#078998",
    fontWeight: "600",
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
