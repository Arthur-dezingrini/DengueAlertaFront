import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../components/authProvider";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";

// import { SafeAreaView } from "react-native-safe-area-context";

export default function Perfil({ navigation }) {
  const { user, token } = useContext(AuthContext);
  const [image, setImage] = useState(user.foto || null);
  const [base64Image, setBase64Image] = useState(null);
  const [permissionCamera, setPermissionCamera] = useState(null);
  const [permissionGalery, setPermissionGalery] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const defaultImage = require("../assets/images/fotoPadraoPerfil.png");

  const voltar = async () => {
    navigation.navigate("Home");
    const AlterarFotoDTO = {
      foto: base64Image,
      id: user.id,
    };
    if (base64Image) {
      try {
        const response = await axios.post(
          "https://denguealertaback-production.up.railway.app/usuario/alterarFotoPerfil",
          AlterarFotoDTO,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data)
        user.foto = response.data
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setPermissionCamera(cameraStatus.status === "granted");
      const galeryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissionGalery(galeryStatus.status === "granted");
    })();
  }, []);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão de câmera necessária");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }

    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    setBase64Image(base64);
    setModalVisible(false);
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão da Galeria Necessária");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }

    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    setBase64Image(base64);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title={"Perfil"} style={styles.header}></Header>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Pressable
            style={styles.imageContainer}
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={image ? { uri: image } : defaultImage} 
              style={styles.image}
            />
          </Pressable>

          <View style={styles.infoContainer}>
            <Text style={styles.infos}>Nome: {user.nome}</Text>
            <Text style={styles.infos}>Email: {user.email}</Text>
          </View>
        </ScrollView>
        <Footer texto="Voltar" onPress={voltar}></Footer>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Escolha uma opção</Text>
            <Pressable style={styles.modalButton} onPress={openCamera}>
              <Text style={styles.modalButtonText}>Tirar uma foto</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={openGallery}>
              <Text style={styles.modalButtonText}>Escolher da galeria</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eee",
  },
  container: {
    width: "100%",
    flex: 1,
    justifyItems: "center",
    gap: 30,
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 75,
  },
  infoContainer: {
    width: "80%",
    gap: 15,
  },
  infos: {
    backgroundColor: "#fff",
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
