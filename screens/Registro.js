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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { auth } from "../firebase";

import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";

const listData = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];
const requiredMessage = "This field is required";
const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Registro = ({ navigation }) => {
  const [emailx, setEmailx] = useState("");
  const [passwordx, setPasswordx] = useState("");
  const [name, setName] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [edad, setEdad] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   name: "",
    //   apellidoPaterno: "",
    //   apellidoMaterno: "",
    //   edad: "",
    //   gender: "",
    //   email: "",
    //   password: "",
    //   passwordRepeat: "",
    // },
    defaultValues: {
      name: "",
      gender: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const password = useRef({});
  password.current = watch("password", "");

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
      .createUserWithEmailAndPassword(emailx, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(emailx, password)
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
            required: {
              value: true,
              message: requiredMessage,
            },
            pattern: {
              value: regex,
              message: "It's not a valid email",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.validationMsgText}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: requiredMessage,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.validationMsgText}>
            {errors.password.message}
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: requiredMessage,
            validate: (value) =>
              value === password.current || "Passwords does not match",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Confirm Password"
            />
          )}
          name="passwordRepeat"
        />
        {errors.passwordRepeat && (
          <Text style={styles.validationMsgText}>
            {errors.passwordRepeat.message}
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: requiredMessage,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Name"
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text style={styles.validationMsgText}>{errors.name.message}</Text>
        )}

        {/* <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: {
              value: true,
              message: requiredMessage,
            },
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
          <Text style={styles.validationMsgText}>
            {errors.apellidoPaterno.message}
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: {
              value: true,
              message: requiredMessage,
            },
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
          <Text style={styles.validationMsgText}>
            {errors.apellidoMaterno.message}
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: requiredMessage,
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Edad"
              keyboardType="numeric"
              maxLength={3}
            />
          )}
          name="edad"
        />
        {errors.edad && (
          <Text style={styles.validationMsgText}>{errors.edad.message}</Text>
        )} */}

        {/* <Button
          title="Submito"
          onPress={handleSubmit(onSubmit)}
          style={[styles.button, styles.buttonOutline]}
        /> */}

        <View style={styles.dropDownContainer}>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: requiredMessage,
              },
            }}
            render={({ field: { onChange, value } }) => (
              <DropDownPicker
                style={styles.input}
                placeholder="Gender"
                placeholderStyle={{
                  color: "darkgrey",
                  fontWeight: "400",
                }}
                open={listOpen}
                setOpen={() => setListOpen(!listOpen)}
                items={listData}
                value={value}
                setValue={(item) => onChange(item())}
                listMode="SCROLLVIEW"
                onSelectItem={(item) => {
                  setListOpen(!listOpen);
                }}
              />
            )}
            name="gender"
          />
          {errors.gender && (
            <Text style={styles.validationMsgText}>
              {errors.gender.message}
            </Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.container} behavior="padding"> */}
      {/* <Image
        source={require("../assets/biosmart-logo.png")}
        style={styles.logo}
      /> */}
      {/* <View style={styles.inputContainer}> */}
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
      {/* </View> */}

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
  );
};

export default Registro;

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
