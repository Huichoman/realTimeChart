import React, { useEffect, useState } from "react";
import {
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

import { useForm, Controller } from "react-hook-form";

const Registro = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [edad, setEdad] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // navigation.replace("Menu");
        navigation.navigate("Menu");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    if (!name.trim()) {
      alert("Please Enter Name");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled
    >
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Nombre"
            />
          )}
          name="nombre"
        />
        {errors.nombre && (
          <Text style={styles.validationMsgText}>Este campo es requerido.</Text>
        )}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Apellido Paterno"
            />
          )}
          name="apellidoPaterno"
        />
        {errors.apellidoPaterno && (
          <Text style={styles.validationMsgText}>Este campo es requerido.</Text>
        )}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Apellido Materno"
            />
          )}
          name="apellidoMaterno"
        />
        {errors.apellidoMaterno && (
          <Text style={styles.validationMsgText}>Este campo es requerido.</Text>
        )}

        {/* <Button
          title="Submito"
          onPress={handleSubmit(onSubmit)}
          style={[styles.button, styles.buttonOutline]}
        /> */}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Registrar</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.container} behavior="padding"> */}
      {/* <Image
        source={require("../assets/biosmart-logo.png")}
        style={styles.logo}
      /> */}
      <View style={styles.inputContainer}>
        {/* <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          autoComplete="email"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Apellido Paterno"
          value={apellidoPaterno}
          onChangeText={(text) => setApellidoPaterno(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Apellido Materno"
          value={apellidoMaterno}
          onChangeText={(text) => setApellidoMaterno(text)}
          style={styles.input}
        /> */}

        {/* <TextInput
          placeholder="Edad"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setEdad(text)}
          value={edad}
          maxLength={3}
        /> */}
      </View>

      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Registrar</Text>
        </TouchableOpacity>
      </View> */}
      {/* </View> */}
    </KeyboardAwareScrollView>

    // </KeyboardAvoidingView>
  );
};

export default Registro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222831",
  },
  inputContainer: {
    width: "80%",
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
    marginTop: 40,
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
    fontSize: 16,
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
  elevation: { elevation: 5, shadowColor: "white" },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 10,
  },
});
