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
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { auth } from "../firebase";

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
    <View>
      <Text>Menu</Text>
      <Button
        title="Visualizar Datos"
        onPress={() => navigation.navigate("Home")}
      />
      <Button
        title="Login Screen"
        onPress={() => navigation.navigate("Login")}
      />

      <Button
        title="Datos del usuario"
        onPress={() => navigation.navigate("User")}
      />

      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};
