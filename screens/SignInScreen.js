import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Context from "../context/Context";
import { signIn, signUp } from "../firebase";
export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signUp");
  async function HandlePress() {
    if (mode == "signUp") {
      try {
        await signUp(email, password);
      } catch (error) {
        alert(error);
      }
    }
    if (mode == "signIn") {
      try {
        await signIn(email, password);
      } catch (error) {
        alert(error);
      }
    }
  }
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{ color: colors.foreground, fontSize: 24, marginBottom: 20 }}
      >
        Welcome To WhatsappClone
      </Text>
      <Image
        source={require("../assets/welcome-img.png")}
        style={{ width: 200, height: 200 }}
        resizeMode="cover"
      />
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: "80%",
            padding: 10,
            marginBottom: 20,
          }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: "80%",
            padding: 10,
            marginBottom: 20,
          }}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <View style={{ marginTop: 20 }}>
          <Button
            title={mode === "signUp" ? "create new account" : "Login"}
            color={colors.secondary}
            onPress={HandlePress}
            disabled={!password || !email}
          />
        </View>
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() =>
            mode === "signUp" ? setMode("signIn") : setMode("signUp")
          }
        >
          <Text style={{ color: colors.secondaryText }}>
            {mode === "signUp"
              ? "Already have an account?Sign IN"
              : "create an new account"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
