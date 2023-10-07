import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const image = require("../assets/Background-Image.png");

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState("");
  const [color, setBackgroundColor] = useState("#090C08");

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userId: result.user.uid,
          name: name,
          color: color,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.", error);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior="padding"
          enabled
        >
          <Text style={styles.appTitle}>Chat It Up</Text>
          <View style={styles.inputContainer}>
            <Text>Hello There!</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Type your username here"
              placeholderTextColor="#757083"
            />
            <Text style={styles.label}>Choose background color</Text>
            <View style={styles.colorOptions}>
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: "#090C08" }]}
                onPress={() => setBackgroundColor("#090C08")}
              />
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: "#474056" }]}
                onPress={() => setBackgroundColor("#474056")}
              />
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: "#8A95A5" }]}
                onPress={() => setBackgroundColor("#8A95A5")}
              />
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: "#B9C6AE" }]}
                onPress={() => setBackgroundColor("#B9C6AE")}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={signInUser}>
              <Text style={styles.buttonText}>Chat Now!</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    padding: "6%",
  },
  appTitle: {
    flex: 2,
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    alignSelf: "center",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    padding: "6%",
    paddingBottom: 20,
  },
  textInput: {
    width: "88%",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    padding: 15,
    borderWidth: 1,
    borderColor: "#757083",
    marginTop: 15,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "300",
    color: "#8A95A5",
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  selectedCircle: {
    borderWidth: 2,
    borderColor: "#FF0000",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#757083",
    padding: 10,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Start;
