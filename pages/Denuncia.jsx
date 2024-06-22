import React, { useEffect, useState, useContext  } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import LoadingModal from "../components/ModalLoading";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../components/authProvider";

export default function Denuncia({ navigation, route }) {
  const { denuncia } = route.params;
  const [endereco, setEndereco] = useState(denuncia.endereco || "");
  const [bairro, setBairro] = useState(denuncia.bairro || '');
  const [cidade, setCidade] = useState(denuncia.cidade || '');
  const [descricao, setDescricao] = useState(denuncia.descricao || '');
  const [checkedLocal, setCheckedLocal] = useState(false);
  const [checkedAnonimo, setCheckedAnonimo] = useState(false);
  const [permissionCamera, setPermissionCamera] = useState(null);
  const [permissionGalery, setPermissionGalery] = useState(null);
  const [image, setImage] = useState(denuncia.imageUrl || '');
  const [base64Image, setBase64Image] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setPermissionCamera(cameraStatus.status === "granted");
      const galeryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
  };

  const handleSubmit = async () => {
    const formData = {
      data: new Date().toISOString("yyyy/MM/dd"),
      endereco,
      bairro,
      cidade,
      descricao,
      denunciaAnonima: checkedAnonimo,
    };

    if (image) {
      formData.imagem = base64Image;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://10.1.198.26:8080/foco/notificar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Alert.alert("Sucesso", "Denúncia enviada com sucesso!");
        setEndereco("");
        setBairro("");
        setCidade("");
        setDescricao("");
        setCheckedAnonimo(false);
        setImage(null);
        setLoading(false);
      } else {
        Alert.alert("Erro", "Falha ao enviar denúncia.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      Alert.alert("Erro", "Ocorreu um erro interno. Contate o suporte.");
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <LoadingModal visible={loading} />
      <Header
        title={"Denúncia"}
        mostrarDocs={true}
        mostrarMenu={true}
        iconLeft={"chevron-thin-left"}
        funcao={() => navigation.navigate("RelatorioDenuncia")}
        funcaoLeft={() => navigation.navigate("Home")}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Endereço"
              style={styles.input}
              value={endereco}
              onChangeText={setEndereco}
            />
            <TextInput
              placeholder="Bairro"
              style={styles.input}
              value={bairro}
              onChangeText={setBairro}
            />
            <TextInput
              placeholder="Cidade/Estado"
              style={styles.input}
              value={cidade}
              onChangeText={setCidade}
            />
            <TextInput
              placeholder="Descrição"
              multiline
              numberOfLines={4}
              style={styles.textArea}
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>
          <View style={styles.checkContainer}>
            <View style={styles.checkBox}>
              <CheckBox
                checked={checkedLocal}
                onPress={() => setCheckedLocal(!checkedLocal)}
                checkedColor="#000"
                uncheckedColor="#000"
              />
              <Text style={styles.checkBoxText}>
                Quer usar a localização atual?
              </Text>
            </View>
            <View style={styles.checkBox}>
              <CheckBox
                checked={checkedAnonimo}
                onPress={() => setCheckedAnonimo(!checkedAnonimo)}
                checkedColor="#000"
                uncheckedColor="#000"
              />
              <Text style={styles.checkBoxText}>Denúncia anônima?</Text>
            </View>
          </View>
          <View style={styles.imageContainer}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </View>
        </View>
      </ScrollView>
      <Footer
        nameIconLeft={"attachment"}
        nameIconRight={"camera"}
        texto={"CONFIRMAR"}
        onPress={handleSubmit}
        onPressRight={openCamera}
        onPressLeft={openGallery}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  scrollViewContent: {
    height: '100%',
    marginTop: 20,
    marginBottom: 60,
  },
  contentContainer: {
    flex: 1,
    width: "100*",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  input: {
    paddingStart: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor:    "#000",
    borderWidth: 1,
    padding: 5,
    height: 40,
    marginBottom: 12,
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 8,
    height: "100*",
    padding: 16,
    textAlignVertical: "top",
    marginBottom: 12,
    borderColor: "#000",
    borderWidth: 1,
  },
  checkContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkBoxText: {
    marginLeft: 8,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});



