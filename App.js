import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { useAssets } from "expo-asset";
import { onAuthStateChanged } from "firebase/auth";
import { app, auth, storage, db } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./screens/SignInScreen";
import ContextWrapper from "./context/ContextWrapper";
// import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ChatScreen from "./screens/ChatScreen";
import PhotoScreeen from "./screens/PhotoScreeen";
import Context from "./context/Context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core",
]);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
  } = useContext(Context);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrUser(user);
      }
    });
    return () => unsubscribe;
  }, []);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="signIn" component={SignInScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.foreground,
              shadowOpacity: 0,
              elevation: 0,
            },
            HeaderTintColor: colors.white,
          }}
        >
          {!currUser.displayName && (
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
          )}

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "WhatsappClone" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
function HomeScreen() {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: () => {
            if (route.name === "Photo") {
              return (
                <Ionicons name="camera" size={20} color={colors.iconGray} />
              );
            } else {
              return (
                <Text style={{ color: colors.white }}>
                  {route.name.toLocaleUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: { color: colors.white },
          tabBarIndicatorStyle: { backgroundColor: colors.white },
          tabBarStyle: { backgroundColor: colors.foreground },
        };
      }}
      initialRouteName="Chats"
    >
      <Tab.Screen name="Photo" component={PhotoScreeen} />
      <Tab.Screen name="Chats" component={ChatScreen} />
    </Tab.Navigator>
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

function Main() {
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png")
  );
  if (!assets) {
    return <Text>Loading....</Text>;
  }
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
}
export default Main;
