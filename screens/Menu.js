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
    </View>
  );
};
