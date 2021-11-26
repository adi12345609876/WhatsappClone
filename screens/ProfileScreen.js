import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import GlobalContext from "../context/Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { pickImage, askpermissions, uploadImage } from "../utils";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../firebase";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
export default function ProfileScreen() {
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const navigation = useNavigation;
  useEffect(() => {
    (async () => {
      const status = await askpermissions();
      setPermissions(status);
    })();
  }, []);
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  async function handlePress() {
    const user = auth.currentUser;
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        "ProfilePicture"
      );
      photoURL = url;
    }
    const userData = {
      displayName: displayName,
      email: user.email,
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
    ]);
    navigation.navigate("Home");
  }

  async function handleprofileImage() {
    const result = await pickImage();

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
    if (!permissions) {
      return <Text>loading...</Text>;
    }
    if (permissions !== "granted") {
      return <Text>Permission denied</Text>;
    }
  }

  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: colors.foreground,
          }}
        >
          Profile
        </Text>
        <Text
          style={{
            fontSize: 22,
            color: colors.text,
            marginTop: 20,
          }}
        >
          Provide the profile information
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 30,
            borderRadius: 120,
            width: 120,
            height: 120,
            backgroundColor: colors.background,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleprofileImage}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons
              name="camera-plus"
              color={colors.iconGray}
              size={45}
            />
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "100%", height: "100%", borderRadius: 120 }}
            />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Type your name"
          value={displayName}
          onChangeText={setDisplayName}
          style={{
            borderBottomColor: colors.primary,
            marginTop: 40,
            borderBottomWidth: 2,
            width: "100%",
          }}
        />
        <View style={{ marginTop: "auto", width: 80 }}>
          <Button
            title="Next"
            onPress={handlePress}
            color={colors.primary}
            disabled={!displayName}
          />
        </View>
      </View>
    </React.Fragment>
  );
}
