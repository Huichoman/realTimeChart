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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { auth, db } from "../firebase";

let dataRef = db.ref("/user");
let ScreenHeight = Dimensions.get("window").height;
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";

const listData = [
  { label: "Masculino", value: "Masculino" },
  { label: "Femenino", value: "Femenino" },
];
// const requiredMessage = "This field is required";
const requiredMessage = "Dato obligatorio";
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
    defaultValues: {
      name: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      edad: "",
      gender: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
    // defaultValues: {
    //   name: "",
    //   gender: "",
    //   email: "",
    //   password: "",
    //   passwordRepeat: "",
    // },
  });

  const password = useRef({});
  password.current = watch("password", "");

  let addItem = (userData) => {
    db.ref(`/users`).push({
      email: userData.email,
      name: userData.name,
      apellidoPaterno: userData.apellidoPaterno,
      apellidoMaterno: userData.apellidoMaterno,
      edad: userData.edad,
      gender: userData.gender,
    });
  };
  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      name: data.name,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      edad: data.edad,
      gender: data.gender,
    };
    addItem(userData);
    handleSignUp(data.email, data.password);
    console.log(data.email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // navigation.replace("Menu");
        navigation.navigate("Menu");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = (userEmail, userPassword) => {
    auth
      .createUserWithEmailAndPassword(userEmail, userPassword)
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
    <View style={styles.container}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        // contentContainerStyle={styles.container}
        // scrollEnabled={true}
        // enableAutomaticScroll={true}
        // enableOnAndroid={true}
      >
        <View style={styles.formContainer}>
          <Text style={styles.titleText}>REGISTRO</Text>
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
              <Text style={styles.validationMsgText}>
                {errors.email.message}
              </Text>
            )}

            <View style={styles.rowContainer}>
              <View style={{ width: "48%" }}>
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
              </View>

              <View style={{ width: "48%" }}>
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
              </View>
            </View>
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
              <Text style={styles.validationMsgText}>
                {errors.name.message}
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

            <View style={styles.rowContainer}>
              <View style={{ width: "48%" }}>
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
                  <Text style={styles.validationMsgText}>
                    {errors.edad.message}
                  </Text>
                )}
              </View>

              <View style={{ width: "48%" }}>
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
                        style={styles.inputDp}
                        placeholder="Gender"
                        placeholderStyle={{
                          color: "darkgrey",
                          fontWeight: "400",
                        }}
                        open={listOpen}
                        dropDownContainerStyle={{
                          borderWidth: 0,
                        }}
                        setOpen={() => setListOpen(!listOpen)}
                        items={listData}
                        value={value}
                        setValue={(item) => onChange(item())}
                        listMode="SCROLLVIEW"
                        closeAfterSelecting={true}
                        // onSelectItem={(item) => {
                        //   setListOpen(!listOpen);
                        // }}
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
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.buttonOutlineText}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Registro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "#222831",
    backgroundColor: "#dedad2",
    borderWidth: 2,
    height: ScreenHeight,
  },
  scrollContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#222831",
    minWidth: "80%",
    backgroundColor: "red",
  },
  inputContainer: {
    width: "90%",
    backgroundColor: "#dedad2",
    marginTop: 20,
    alignItems: "stretch",
    borderWidth: 0,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#dedad2",
    marginTop: ScreenHeight * 0.08,
    alignItems: "center",
    borderWidth: 0,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 50,
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
    borderWidth: 2,
    marginTop: ScreenHeight * 0.06,
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
    // width: "100%",
    // height: 30,
    // borderWidth: 1,
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  columnContainer: {
    width: "80%",
  },
  inputDp: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 5,
    minHeight: 39,
    height: "auto",
    borderWidth: 0,
  },
  titleText: {
    color: "#30475E",
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 15,
  },
});
